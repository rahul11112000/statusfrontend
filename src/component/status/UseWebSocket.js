import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";

const useWebSocket = () => {
    const com_id = localStorage.getItem("com_id");
    const token = localStorage.getItem("token");
    const [statuses, setStatuses] = useState([]); // Use only one state

    useEffect(() => {
        if (!com_id || !token) {
            console.error("Missing com_id or token!");
            return;
        }

        // Fetch initial data
        axios.get(`http://applicationstatus.ap-south-1.elasticbeanstalk.com/status/get-all/status/${com_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => setStatuses(response.data)) // Store in `statuses`
        .catch(error => console.error("Error fetching status data", error));

        // Setup WebSocket connection
        const client = new Client({
            brokerURL: "ws://applicationstatus.ap-south-1.elasticbeanstalk.com/ws/websocket", // WebSocket URL
            reconnectDelay: 5000, // Auto-reconnect
            connectHeaders: {
                Authorization: `Bearer ${token}` // Pass token in headers
            },
            onConnect: () => {
                console.log("Connected to WebSocket");

                client.subscribe("/topic/status-updates", (message) => {
                    const updatedStatus = JSON.parse(message.body);

                    setStatuses((prevStatuses) => {
                        const exists = prevStatuses.some((status) => status.id === updatedStatus.id);
                        
                        if (exists) {
                            // Update existing status, ensuring deep merging
                            return prevStatuses.map((status) =>
                                status.id === updatedStatus.id
                                    ? {
                                          ...status,
                                          ...updatedStatus,
                                          component: {
                                              ...status.component,
                                              ...updatedStatus.component,
                                              application: {
                                                  ...status.component?.application,
                                                  ...updatedStatus.component?.application,
                                              },
                                              user: {
                                                  ...status.component?.application?.user,
                                                  ...updatedStatus.component?.application?.user,
                                              },
                                          },
                                      }
                                    : status
                            );
                        } else {
                            // Add new status if it doesn't exist
                            return [...prevStatuses, updatedStatus];
                        }
                    });
                });
            },
            onDisconnect: () => console.log("Disconnected from WebSocket"),
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [com_id, token]); // Add dependencies to avoid stale values

    return statuses; // Return `statuses`, not `products`
};

export default useWebSocket;
