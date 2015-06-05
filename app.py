from flask import Flask,request,url_for,redirect,render_template,session,flash
from flask.ext.socketio import SocketIO, emit

import mongo
# http://blog.miguelgrinberg.com/post/easy-websockets-with-flask-and-gevent
# FOLLOW THIS
# https://community.webfaction.com/questions/14602/handshake-error-socket-io
# THIS TOO


app=Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app)

@app.route("/login")
def login():
    return render_template('login.html');

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "GET":
        return render_template('signup.html');
    elif request.method == "POST":
        username = request.form.get("name", None)
        password = request.form.get("password", None)
        mongo.insert(name,password)
        return render_template('login.html');
        

@app.route("/")
def index():
    return render_template('index.html')
'''
@socketio.on('my event', namespace='/test')
def test_message(message):
    emit('my response', {'data': message['data']})

@socketio.on('my broadcast event', namespace='/test')
def test_message(message):
    emit('my response', {'data': message['data']}, broadcast=True)

@socketio.on('connect', namespace='/test')
def test_connect():
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected')
'''

@socketio.on('click1', namespace='')
def test_click1(message):
    print message

@socketio.on('click2', namespace='')
def test_click2(message):
    print message
    
if __name__ == '__main__':
    #socketio.run(app)
    socketio.run(app,host="0.0.0.0",port=5000)
    app.debug=True
    #app.run(host="0.0.0.0",port=7000)



