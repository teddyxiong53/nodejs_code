class MyBuffer {
    constructor() {
        this._buffers = Array.prototype.slice.call(arguments).filter(function(a) {
            return Buffer.isBuffer(a);
        });
    }
    add(buf) {
        if(Buffer.isBuffer(buf)) {
            this._buffers.push(buf);
        } else {
            this._buffers.push(Buffer.alloc(buf.length, buf));
        }
    }
    clear() {
        return this._buffers = [];
    }
    size() {
        return this._buffers.reduce(function(prev, curr) {
            return prev + curr.length;
        }, 0);
    }

    slice(start, length) {
        var all_len = this.size() - start;
        if(all_len < 0) {
            all_len = 0;
        }
        if(typeof length == "undefined") {
            length = all_len;
        } else {
            ;
        }
        var buf_len = Math.min(length, all_len);
        var buf = Buffer.alloc(buf_len);
        var i =0;
        var offset = 0;
        for(i=0; i<this._buffers.length; i++) {
            let pbuf = this._buffers[i];
            if(pbuf.length > start) {
                var copy_len = pbuf.copy(buf, offset ,start, Math.min(start+length, pbuf.length));
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

    toBuffer() {
        return this.slice(0);
    }

    delete(length) {
        var rest = this.slice(length);
        this.clear();
        this.add(rest);
    }
}

/*
var c1 = new MyBuffer(Buffer.alloc(5,'a'));
c1.add("bbbbb");
c1.add(Buffer.alloc(5,'c'));
console.log(c1._buffers);
console.log(c1.size());
console.log(c1._buffers.length);
console.log(c1.toBuffer());
console.log(c1.slice(0,6));
console.log(c1.slice(6,8));
c1.delete(5);
console.log(c1._buffers);
*/
var c2 = new MyBuffer();
var buf = "1234";
c2.add(buf);
console.log(c2._buffers);

var headerBuf = c2.slice(0,2);
let value = headerBuf.readUInt16BE(0);
console.log("%s", value.toString("16"));