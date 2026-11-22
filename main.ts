import{mkdirSync as d,readdirSync as r,readFileSync as f,writeFileSync as w}from'node:fs'
import{join as j}from'node:path'
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output'
// [opcode, immediate bytes, pops, pushes] for every opcode the ISA names.
const T=[[0,0,0,0],[1,1,0,1],[2,4,0,1],[3,0,1,0],[4,0,1,2],[5,0,2,2],[6,0,2,3],[7,0,3,3],[16,0,2,1],[17,0,2,1],[18,0,2,1],[19,0,2,1],[20,0,2,1],[21,0,2,1],[22,0,2,1],[23,0,1,1],[24,0,2,1],[25,0,2,1],[26,0,2,1],[27,0,1,1],[28,0,2,1],[29,0,2,1],[30,0,2,1],[32,0,2,1],[33,0,2,1],[34,0,2,1],[48,2,0,0],[49,2,1,0],[50,2,1,0],[51,2,0,0],[52,0,0,0],[64,0,1,1],[65,0,2,0],[80,0,1,0],[81,0,1,0],[82,0,0,1],[83,0,1,0]],M=new Uint8Array(256),P=new Uint8Array(256),U=new Uint8Array(256),K=new Uint8Array(256)
for(const[op,m,p,u]of T)M[op]=m,P[op]=p,U[op]=u,K[op]=1
// Runs one program on its input. Returns [output bytes, exit code].
function run(p,q){const n=p.length,S=new Int32Array(256);let s=0,C=new Int32Array(64),c=0,Y=new Int32Array(256),o=Buffer.alloc(65536),l=0,g=0,x=0,t=0
const e=v=>[o.subarray(0,l),v]
for(;;){if(t==1e6)return e(10);if(x<0||x>=n)return e(9);const a=p[x];if(!K[a])return e(5);const m=M[a];if(x+m>=n)return e(9);t++;const y=x+1+m,z=P[a];if(s<z)return e(2);if(s-z+U[a]>256)return e(3);x=y
switch(a){case 0:return e(0)
case 1:S[s++]=(p[y-1]<<24)>>24;break
case 2:S[s++]=p[y-4]|p[y-3]<<8|p[y-2]<<16|p[y-1]<<24;break
case 3:s--;break
case 4:S[s]=S[s-1];s++;break
case 5:{const b=S[s-1];S[s-1]=S[s-2];S[s-2]=b;break}
case 6:S[s]=S[s-2];s++;break
case 7:{const b=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=b;break}
case 23:S[s-1]=-S[s-1]|0;break
case 27:S[s-1]=~S[s-1];break
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{const b=S[s-1],v=S[s-2];let h
if(a==16)h=(v+b)|0;else if(a==17)h=(v-b)|0;else if(a==18)h=Math.imul(v,b);else if(a==19){if(!b)return e(4);h=v==-2147483648&&b==-1?v:(v/b)|0}else if(a==20){if(!b)return e(4);h=b==-1?0:(v%b)|0}else if(a==21){if(!b)return e(4);h=Math.floor((v>>>0)/(b>>>0))|0}else if(a==22){if(!b)return e(4);h=((v>>>0)%(b>>>0))|0}else if(a==24)h=v&b;else if(a==25)h=v|b;else if(a==26)h=v^b;else if(a==28)h=v<<(b&31);else if(a==29)h=v>>(b&31);else if(a==30)h=(v>>>(b&31))|0;else if(a==32)h=v==b?1:0;else if(a==33)h=v<b?1:0;else h=(v>>>0)<(b>>>0)?1:0
s-=2;S[s++]=h;break}
case 48:case 49:case 50:{const k=((p[y-2]|p[y-1]<<8)<<16)>>16;if(a==48||(a==49?S[--s]==0:S[--s]!=0))x=y+k;break}
case 51:if(c==64)return e(7);C[c++]=y;x=p[y-2]|p[y-1]<<8;break
case 52:if(!c)return e(8);x=C[--c];break
case 64:{const k=S[s-1];if(k<0||k>255)return e(6);S[s-1]=Y[k];break}
case 65:{const k=S[s-1];if(k<0||k>255)return e(6);const v=S[s-2];s-=2;Y[k]=v;break}
case 80:{const h=String(S[s-1]);if(l+h.length>65536)return e(11);o.write(h,l,'ascii');l+=h.length;s--;break}
case 81:if(l+1>65536)return e(11);o[l++]=S[--s]&255;break
case 82:S[s++]=g<q.length?q[g++]:-1;break
case 83:return e(S[--s]&255)}}}
function R(p){try{return f(p)}catch{return Buffer.alloc(0)}}
for(const id of r(I).sort()){try{const[a,b]=run(R(j(I,id,'program.bin')),R(j(I,id,'input.bin')));d(j(O,id),{recursive:!0});w(j(O,id,'stdout.bin'),a);w(j(O,id,'exit.txt'),b+'\n')}catch{d(j(O,id),{recursive:!0});w(j(O,id,'stdout.bin'),'');w(j(O,id,'exit.txt'),'9\n')}}
