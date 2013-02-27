#! /usr/bin/env python

# StackMob Web Server v0.1.0
#
# This server is used for running HTML5 StackMob applications
# locally on your computer for development purposes.
#
# It functions as a conditional proxy server. Resource
# files like static html, images, css, etc. are served
# as a normal http server.  Requests originating from
# the StackMob JavaScript SDK contain a special HTTP
# Header that tells this web server to forward requests
# to the StackMob API Server.

import cgi, os, SocketServer, sys, time, urllib2, urlparse
from SimpleHTTPServer import SimpleHTTPRequestHandler
from StringIO import StringIO

STACKMOB_API_SERVER = 'api.stackmob.com'

class ProxyHandler(SimpleHTTPRequestHandler):

    def handle_request(self):
        if 'X-StackMob-Proxy-Plain' in self.headers:
            # PROXY TO STACKMOB
            self.log_request()

            # Determine Path
            path = 'http://' + STACKMOB_API_SERVER + self.path
            print '\nProxying Request to ' + path

            # Determine Headers
            headers = {}
            for key_val in self.headers.items():
                headers[ key_val[0].upper() ] = key_val[1]

            # Overwrite host header for Proxy
            netloc = headers['HOST']
            i = netloc.find(':')
            if i >= 0:
                host = netloc[:i], int(netloc[i+1:])
            else:
                host = netloc, 80

            headers['HOST'] = STACKMOB_API_SERVER
            headers['X-FORWARDED-FOR'] = host[0]
            headers['X-STACKMOB-FORWARDED-PORT'] = host[1]
            headers['X-STACKMOB-FORWARDED-HOST'] = host[0]
            headers['X-FORWARDED-PROTO'] = 'HTTP'
            headers['VERSION'] = 'HTTP/1.1'

            print 'Request Headers'
            for key in headers:
                print '\t%s: %s' % ( key, headers[ key ] )

            # Determine Body Content
            if 'CONTENT-LENGTH' in self.headers:
                content_len = int(self.headers.getheader('content-length'))
                data = self.rfile.read(content_len)
            else: data = None

            # Create Request
            opener = urllib2.build_opener(urllib2.HTTPHandler)
            if data is None:
                req = urllib2.Request(path, headers=headers)
            else:
                req = urllib2.Request(path, data, headers)

            # Connect
            req.get_method = lambda: self.command
            try:
                url = urllib2.urlopen(req)
                # Send response back to client
                response_status = 'HTTP/1.1 %s %s\r\n' % ( url.getcode(), url.msg )
                self.connection.send( response_status )

                print 'Response Headers'
                print '\t', response_status,
                for item in url.info().headers:
                    self.connection.send( item )
                    print '\t%s' % ( item ),
                self.connection.send('\r\n')
                self.connection.send( url.read() )
                self.connection.close()
                print

            except urllib2.HTTPError, e:
                response_status = 'HTTP/1.1 %s %s\r\n' % ( e.code, e.msg )
                self.connection.send( response_status )

                print 'Response Headers'
                print '\t', response_status,
                for item in e.headers:
                    header = '%s: %s\r\n' % ( item, e.headers[ item ] )
                    self.connection.send( header )
                    print '\t' + header,
                self.connection.send('\r\n')
                self.connection.send( e.fp.read() )
                self.connection.close()
                print

            return None

        else:
            # Default Web Server
            f = self.send_head()
            if f:
                self.copyfile(f, self.wfile)
                f.close()

    do_GET = handle_request
    do_POST = handle_request
    do_HEAD = handle_request
    do_PUT = handle_request
    do_DELETE = handle_request

httpd = SocketServer.TCPServer(('', 4567), ProxyHandler)
print 'serving at port', 4567
httpd.serve_forever()
