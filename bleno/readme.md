板端：树莓派3B。默认蓝牙。

手机端：nordic connect for mobile这个app。



# 01

这个可以把bleno跑起来，看一些基本信息。

```
pi@raspberrypi:~/work/test$ sudo node test.js 
Starting 1545209111421
on -> stateChange: poweredOn
on -> advertisingStart: success
Starting
```

可以连上。

# 02

这个可以板端给手机发送消息。

手机上需要选择可读服务。然后板端就开始发送“Hi！”给手机端。

```
pi@raspberrypi:~/work/test$ sudo node test.js 
State change: poweredOn
Advertising start success
Accepted connection from address: 49:a2:39:59:9e:42
Device subscribed
Sending: Hi!
(node:2060) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
Sending: Hi!
Sending: Hi!
Sending: Hi!
Sending: Hi!
Sending: Hi!
Sending: Hi!
Device unsubscribed
Disconnected from address: 49:a2:39:59:9e:42
```

# 03

我在02的基础上，自己增加了一个service。

