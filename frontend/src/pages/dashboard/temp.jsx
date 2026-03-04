<div
                                key={ws.id}
                                className="border p-3 rounded shadow-sm flex justify-between"
                            >
                                <span>{ws.name}</span>
                                <button 
                                    onClick={async () => {
                                        await deleteWorkspace(ws.id);
                                        loadWorkspaces();
                                    }}
                                    className="text-red-500"
                                >Delete</button>
                            </div>