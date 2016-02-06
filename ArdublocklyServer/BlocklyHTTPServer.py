from __future__ import unicode_literals, absolute_import
import os
try:
    # 2.x name
    import BaseHTTPServer
except ImportError:
    # 3.x name
    import http.server as BaseHTTPServer
import ArdublocklyServer.BlocklyRequestHandler

ADDRESS = '0.0.0.0'
PORT = 80


def start_server(document_root):
    """ Start the server with the document root indicated by argument """
    print('\nSetting HTTP Server Document Root to: \n\t' + document_root + "\n")
    os.chdir(document_root)
    server_address = (ADDRESS, PORT)
    server = BaseHTTPServer.HTTPServer(
        server_address,
        ArdublocklyServer.BlocklyRequestHandler.BlocklyRequestHandler)
    print('Launching the HTTP service...')
    server.serve_forever()
    print('The Server closed unexpectedly!!')


if __name__ == "__main__":
    start_server(os.getcwd())
