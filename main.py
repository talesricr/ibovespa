import os, time

while 1:
    print(str('--------' + time.asctime()) + '--------')
    os.system('node app.js')
    time.sleep(60*5)
    
