import {Message} from './../messenger/message'
import {CRC} from './../interfaces/crc'
import {SerializerInfo} from './../serializer/serializerInfo'
import {MessageInfo} from './../messenger/messageInfo'
import {NumberType} from './../enums/numberType'
import {BitOrder} from './../enums/bitOrder'
import {PropertyType} from './../enums/propertyType'
import {} from 'node'
/**
 * @ignore
 */
export class MessageExample extends Message{
 
    @SerializerInfo.position(0)
    @SerializerInfo.numberType(NumberType.UInt8)
    @SerializerInfo.ignoreDeserialize
    public start:number

    @SerializerInfo.position(1) 
    @SerializerInfo.numberType(NumberType.UInt8)  
    @SerializerInfo.ignoreDeserialize  
    public length: number;

    @SerializerInfo.position(2)    
    @SerializerInfo.lenght(4)
    @SerializerInfo.propertyType(PropertyType.Buffer)
    public head: Buffer;
    
    @SerializerInfo.position(6)   
    //@SerializerInfo.lenght(5)
    @SerializerInfo.propertyType(PropertyType.Buffer)
    public data: Buffer

    @MessageInfo.enableLastChar(true)
    public end:number | null;
   
    @MessageInfo.enableCRC(2,2,10)
    public CRC:CRC;

    /**
     *
     */
    constructor() {
        super();
        this.start = 0x00;
        this.CRC = {
            compute:function(arr:Array<number>){
                return Buffer.from([0xFA,0xFB]);
            }
        }
        this.end = 0xFF;
    }
}