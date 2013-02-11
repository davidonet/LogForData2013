#! /usr/bin/env python

# Based on code from http://effbot.org/librarybook/simplehttpserver.htm

import SocketServer
import SimpleHTTPServer
import urllib
import xmlrpclib
import cgi

PORT = 8080
proxy = xmlrpclib.ServerProxy("http://localhost:7362")
http_begin='<html>\
	<head>\
		<meta charset="UTF-8"/>\
		<meta HTTP-EQUIV="REFRESH" CONTENT="5">\
		<link rel="stylesheet" href="css/main.css" media="all"  type="text/css"/>\
		<script language="JavaScript" src="http://www.geoplugin.net/javascript.gp" type="text/javascript"></script>\
		<script src="https://www.google.com/jsapi?key=ABQIAAAAUmJGZYrUYIcbD7Ly2ZvYIhSacRQeAEhqw9om3fFogmzza_L5ehSNCncVEKKUSHceXYHCF4MbjeXjow" type="text/javascript"></script>\
		<script language="Javascript" type="text/javascript">\
			google.load("jquery", "1");\
			google.load("jqueryui", "1");\
			google.load("search", "1");\
		</script>\
		<script language="JavaScript" src="js/dyn.js"></script>\
		<script language="JavaScript" src="js/local.js"></script>\
		<script language="JavaScript" src="js/main.js"></script>\
		<title>LFD System</title>\
	</head>\
	<body>'

http_end ='</body></html>'

class Proxy(SimpleHTTPServer.SimpleHTTPRequestHandler):
	def do_GET(self):
		# Is this a special request to /__ajaxproxy/
		prefix = '/__ajaxproxy/'
		if self.path.startswith(prefix):
			# Strip off the prefix.
			newPath = self.path.lstrip(prefix)
			print "GET remote: ", newPath
			try:
				self.copyfile(urllib.urlopen(newPath), self.wfile)
			except IOError, e:
				print "ERROR:   ", e
		else :
			if self.path.startswith("/receive"):
				self.send_response(200, 'OK')
				self.send_header('Content-type', 'text/plain')
				self.end_headers()
				#self.wfile.write(http_begin);
				nb = proxy.text.get_rx_length()
				if 0 < nb :
					self.wfile.write(proxy.text.get_rx(0, nb).data);
				#	proxy.text.clear_rx();
					#proxy.text.clear_rx();
				#self.wfile.write(http_end);
			else :
				SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)
			
	def do_POST(self):
		# Parse the form data posted
		form = cgi.FieldStorage(fp=self.rfile, headers=self.headers, environ={'REQUEST_METHOD':'POST', 'CONTENT_TYPE':self.headers['Content-Type'], })
		self.send_response(200)
		
		print('Client: %s\n' % str(self.client_address))
		print('User-agent: %s\n' % str(self.headers['user-agent']))
		print('Path: %s\n' % self.path)
		print('Form data:\n')
		
		for field in form.keys():
			field_item = form[field]
			if field_item.filename:
				file_data = field_item.file.read()
				file_len = len(file_data)
				del file_data
				print('\tUploaded %s as "%s" (%d bytes)\n' % (field, field_item.filename, file_len))
			else:
				print('\t%s=%s\n' % (field, form[field].value))
	
		if self.path.startswith('/encode'):
			proxy.text.add_tx(unicode(form['text2encode'].value,"utf-8" ));
			proxy.main.tx();
		return
		
SocketServer.ThreadingTCPServer.allow_reuse_address = True
httpd = SocketServer.ThreadingTCPServer(('', PORT), Proxy)
print "serving at port", PORT
httpd.serve_forever()
