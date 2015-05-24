import websocket
ws = websocket.WebSocket()
ws.connect("127.0.0.1", http_proxy_host="proxy_host_name", http_proxy_port=8000)
