const EventEmitter = require("events");

class BufferManager extends EventEmitter {
	
	constructor() {
		super();
		this._buffers = Array.prototype.slice.apply(arguments).filter(function(a) {
			return Buffer.isBuffer(a);
		});
	}
	size() {
		return this._buffers.reduce(function(prev, curr) {
			return prev + curr.length;
		}, 0);
	}
	add(buf) {
		if(Buffer.isBuffer(buf)) {
			this._buffers.push(buf);
		} else if(buf) {
			this._buffers.push(Buffer.alloc(buf.length, buf));
		}
		this.emit("add");
	}
	toBuffer() {
		return this.slice(0);
	}
	slice(start, length) {
		var all_len = this.size() - start;
		if(all_len < 0 ) {
			all_len = 0;
		}
		length = (typeof length == "undefined") ? all_len : length;
		console.log("length:" + length);
		
		var buf_len = Math.min(all_len, length);
		if(buf_len <= 0) {
			return Buffer.alloc(0);
		}
		
		var buf = Buffer.alloc(buf_len);
		var offset = 0;
		var i;
		for(i=0; i<this._buffers.length; i++) {
			console.log("i:" + i);
			let pbuf = this._buffers[i];
			if(pbuf.length > start) {
				var copy_len = pbuf.copy(buf, offset, start, Math.min(start+length, pbuf.length));
				offset += copy_len;
				length -= copy_len;
				start = 0;
			} else {
				start -= pbuf.length;
			}
			if(length <= 0) {
				break;
			}
		}
		return buf;
	}
	delete(length) {
		var rest = this.slice(length);
		this.clear();
		this.add(rest);
	}
	clear() {
		return this._buffers = [];
	}
}

var bufferManager = new BufferManager(1);
console.log(bufferManager._buffers);
var buffer = Buffer.alloc(10);
var bufferManager2 = new BufferManager(buffer);


buffer = Buffer.from("abcd", "ascii");
bufferManager2.add(buffer);
console.log(bufferManager2._buffers);

console.log(bufferManager.size());
console.log(bufferManager2.size());

console.log(bufferManager2.toBuffer());

bufferManager2.delete(5);
console.log(bufferManager2);

