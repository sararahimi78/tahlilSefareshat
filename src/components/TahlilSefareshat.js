import React, { useEffect, useState } from 'react';
import  Select  from 'react-select';
import axios from 'axios'
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';


//css
import './TahlilSefareshat.css'

import {Col , Row , Form , Button ,Table ,Modal} from 'react-bootstrap'

const TahlilSefareshat = () => {

    useEffect(()=>{
        axios.get('http://automation.kimiafard.ir/api/parmisSupplierList')
            .then(res =>{
                setSelected(res.data.response)
            })
            .catch(er => console.log(er))
    },[])


    const tahlilSefareshParminCall = () => {
        setClicked(false)
        const url = 'http://automation.kimiafard.ir/api/tahlilSefareshParmis';
        const formData = new FormData();
        formData.append('searchWord', searchField);
        formData.append('supplierId', SuplierSelected === 0? 0: SuplierSelected.value);
        formData.append('foroshChandRooz', FroshChandRuz);
        formData.append('niazChandRooz', NiazChandRuz);
        axios.post(url, formData)
        .then(res =>{
            console.log(res);
            if (parseInt(res.data.code,10) === 200) {
                setTahlilResult(res.data.response)
                setLoaded(false)
            }
        })
        .catch(er => console.log(er))
    }



   

   

   




    const [Selected,setSelected] = useState([])
    const [SuplierSelected,setSuplierSelected] = useState(0)
    const [searchField,setsearchField] = useState("")
    const [FroshChandRuz,setFroshChandRuz] = useState(30)
    const [NiazChandRuz,setNiazChandRuz] = useState(15)
    const [Loaded,setLoaded] = useState(true)
    const [Clicked,setClicked] = useState(true)
    const [TahlilResult,setTahlilResult] = useState([])
    const [EndedResult, setEndedResult] = useState([])
    const [EndedModal, setEndedModal] = useState(false)


    const options = Selected;









    const Sefaresh = [];
    const SendSefaresh = (GoodsRef, GoodsCode, GoodsName, NQTY) => {
        Sefaresh.push({"GoodsRef": GoodsRef, 'GoodsCode': GoodsCode, "GoodsName" : GoodsName, "qty": NQTY})
        console.log(GoodsRef, GoodsCode, GoodsName, NQTY, Sefaresh);
    }





    function marjueee(){

        const mymarjueee  = document.getElementsByName("sefareshat")

        console.log(mymarjueee);

        const array2 = [];

        for (let k = 0; k < mymarjueee.length; k+=1)
         {
            if (parseFloat(document.getElementsByName("sefareshat")[k].value) > 0 && document.getElementsByName("sefareshat")[k].value !== "") {
              console.log(document.getElementsByName("sefareshat")[k].min, document.getElementsByName("sefareshat")[k].min.split(","));
                array2.push({

                    "GoodsRef": document.getElementsByName("sefareshat")[k].id,
                    "GoodsName": document.getElementsByName("sefareshat")[k].max,
                    "GoodsCode": document.getElementsByName("sefareshat")[k].min.split(",")[1],
                    "CartonType": document.getElementsByName("sefareshat")[k].min.split(",")[3],
                    "isRegisteredInKFP": document.getElementsByName("sefareshat")[k].min.split(",")[4],
                    "DC1Sale": document.getElementsByName("sefareshat")[k].min.split(",")[5],
                    "DC2Sale": document.getElementsByName("sefareshat")[k].min.split(",")[6],
                    "DC3Sale": document.getElementsByName("sefareshat")[k].min.split(",")[7],
                    "KFpSale": document.getElementsByName("sefareshat")[k].min.split(",")[8],
                    "AraziCardex": document.getElementsByName("sefareshat")[k].min.split(",")[9],
                    "GolshahrCardex": document.getElementsByName("sefareshat")[k].min.split(",")[10],
                    "APICardex": document.getElementsByName("sefareshat")[k].min.split(",")[11],
                    "KFPMainCardex": document.getElementsByName("sefareshat")[k].min.split(",")[12],
                    "KFPQaurantineCardex": document.getElementsByName("sefareshat")[k].min.split(",")[13],
                    "DoNotOrder": document.getElementsByName("sefareshat")[k].min.split(",")[14],
                    "DoNotOrderArazi": document.getElementsByName("sefareshat")[k].min.split(",")[15],
                    "DoNotOrderGolshahr": document.getElementsByName("sefareshat")[k].min.split(",")[16],
                    "NiazArazi": document.getElementsByName("sefareshat")[k].min.split(",")[17],
                    "NiazGolshahr": document.getElementsByName("sefareshat")[k].min.split(",")[18],
                    "NiazOnline": document.getElementsByName("sefareshat")[k].min.split(",")[19],
                    "NiazKFP": document.getElementsByName("sefareshat")[k].min.split(",")[20],
                    "OrderSuggestion": document.getElementsByName("sefareshat")[k].min.split(",")[21],
                    "qty": document.getElementsByName("sefareshat")[k].value,
                    }) 

                    }
                    }



                    const data = {
                        "supplierName": SuplierSelected.label,
                        "supplierId": SuplierSelected.value,
                        "userName": JSON.parse(localStorage.getItem('user')).userName,
                        "products": array2
    
                    }
                    console.log('data',data);
    
                    axios.post('http://automation.kimiafard.ir/api/parmisOrderToSupplier', JSON.stringify(data))
                   
                    .then((res)=>{
                          console.log(res.data);
                          if (parseInt(res.data.code, 10) === 200) {
                              setEndedModal(true)
                              setEndedResult(res.data)
                          }
                        })
                        .catch(er=>console.log(er))
    
    
                  


    };

    




    return (
        <>
           <Form className='formTahlil'>
                <Row className='rowTahlil'>
                  <Col>
                     <p>
                        ?????????? ??????????    
                     </p>
                    <Select  
                        myFontSize="15px" 
                        options={options}  
                        onChange={setSuplierSelected}
                        placeholder="???????????? ????????"
                        
                        />
                  </Col>
                  <Col>
                    <p>
                        ?????????? ?????????? ??????????    
                    </p>
                    <Form.Control placeholder="??????"
                       type="text"
                       name="AddressName"
                       autoComplete="off"
                       onChange={e => {
                            console.log(e.target.value)
                            setsearchField(e.target.value)
                        }} />
                  </Col>
                  <Col>
                    <p>
                        ???????????? ???????? ?????? ??????    
                    </p>
                    <Form.Control placeholder="30"
                     type="text"
                     name="AddressName"
                     autoComplete="off"
                     onChange={e => {
                         console.log(e.target.value)
                         setFroshChandRuz(parseInt(e.target.value,10))
                     }} />
                  </Col>
                  <Col>
                    <p>
                        ???????????? ???????? ?????? ??????    
                    </p>
                    <Form.Control
                     placeholder="15"
                     type="text"
                     name="AddressName"
                     autoComplete="off"
                     onChange={e => {
                         console.log(e.target.value)
                         setNiazChandRuz(parseInt(e.target.value,10))
                     }}/>
                  </Col>
                  <Col>
                    <Button className='btnMoshahede' onClick={()=> tahlilSefareshParminCall()}>
                        ????????????
                    </Button>
                  </Col>
                 
                </Row>


                <Col>
                  {
                    !Loaded?
                    
                        <>
                        
                       <div className='main-taqyirat'>
                       <Button className='btn-taqyirat' onClick={() => marjueee()}>
                                    ?????? ??????????????
                        </Button>
                        
                       </div>
                    
                  

                        </>

                    
                    :
                    null
                    }
                  </Col>
          </Form>

          <Row>
                {
                    !Clicked?
                        <>
                            {
                                Loaded? 
                                <div className='loading'/>
                                :

                                <Table className='table' >
                                    <thead >
                                            <tr>
                                                <th className='radif' >
                                                    <p  >????????</p>
                                                </th>
                                                <th className='style2'>
                                                    <p  >???? ????????</p>
                                                </th>
                                               
                                                <th className='style2'>
                                                    <p >?????? ????????</p>
                                                </th>
                                                <th className='style2'>
                                                    <p >?????????? ???? ??????????</p>
                                                </th>
                                                <th className='style3'>
                                                    <p >???????????? A</p>
                                                </th>
                                                <th className='style3'>
                                                    <p >???????????? G</p>
                                                </th>
                                                <th className='style3'>
                                                    <p >???????????? Online</p>
                                                </th>
                                                <th className='style3'>
                                                    <p >???????????? ???????? K.F.p</p>
                                                </th>
                                                <th className='style3'>
                                                    <p > ???????????? ?????????????? K.F.p</p>
                                                </th>
                                                <th className='style4'>
                                                    <p >???????? A</p>
                                                </th> 
                                                <th className='style4'>
                                                    <p >???????? G</p>
                                                </th>
                                                <th className='style4'>
                                                    <p >???????? Online</p>
                                                </th>
                                                <th className='style4'>
                                                    <p>???????? API</p>
                                                </th>
                                                <th className='style5'>
                                                    <p >?????????????? ??????????</p>
                                                </th>
                                                <th className='style5'>
                                                    <p >??????????</p>
                                                </th>
                                                
                                                <th className='style6'>
                                                    <p >?????????????? A</p>
                                                </th>
                                                <th className='style6'>
                                                    <p >?????????????? G</p>
                                                </th>
                                                <th className='style6'>
                                                    <p >?????????????? ????</p>
                                                </th>
                                                <th className='style8' >
                                                    <p >???????? A</p>
                                                </th>
                                                <th className='style8' >
                                                    <p >???????? G</p>
                                                </th>
                                                <th className='style8' >
                                                    <p>???????? Online</p>
                                                </th>
                                                <th className='style8' >
                                                    <p >???????? API</p>
                                                </th>
                                                
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                TahlilResult.length>0?
                                                TahlilResult.map((i, j)=>{
                                                    return(
                                                        <tr key='1'>
                                                            <td className='radif'  >{j+1}</td>
                                                          
                                                            <td className='style2' >{i.GoodsCode}</td>
                                                            <td className='style2'>{i.GoodsName}</td>
                                                            <td className='style2'>{i.CartonType}</td>
                                                            <td className='style3'>{i.AraziCardex}</td>
                                                            <td className='style3'>{i.GolshahrCarde}</td>
                                                            <td className='style3'>{i.APICardex}</td>
                                                            <td className='style3'>{i.KFPMainCardex}</td>
                                                            <td className='style3'>{i.KFPQaurantineCardex}</td>
                                                            <td  className='style4'>{i.DC1Sale}</td>
                                                            <td className='style4'>{i.DC2Sale}</td>
                                                            <td className='style4'>
                                                                {i.DC3Sale}
                                                            </td >
                                                            <td  className='style4'>{i.KFpSale}</td>
                                                            <td className='style5'>{ <input type="text"  
                                                                min={
                                                                    `${i.GoodsRef},${i.GoodsCode},${i.GoodsName},${i.CartonType},${i.isRegisteredInKFP},${i.DC1Sale},${i.DC2Sale},${i.DC3Sale},${i.KFpSale},${i.AraziCardex},${i.GolshahrCardex},${i.APICardex},${i.KFPMainCardex},${i.KFPQaurantineCardex},${i.DoNotOrder},${i.DoNotOrderArazi},${i.DoNotOrderGolshahr},${i.NiazArazi},${i.NiazGolshahr},${i.NiazOnline},${i.NiazKFP},${i.OrderSuggestion},`
                                                                } 
                                                                max={i.GoodsName}
                                                                id={i.GoodsRef} name="sefareshat" onClick={(e)=>SendSefaresh(i.GoodsRef, i.GoodsCode, i.GoodsName, e.target.value)}
                                                                style={{width:"120px", height:"30px", border:"1px solid #A8AB74", borderRadius:"10px", textAlign:"center", fontSize:"14px"}}
                                                                />}</td>
                                                            <td className='style5'>{i.OrderSuggestion}</td>
                                                            <td className='style6'>{i.DoNotOrderArazi}</td>
                                                            <td className='style6'>{i.DoNotOrderGolshahr}</td>
                                                            <td className='style6'>{i.DoNotOrder}</td>
                                                            <td  className='style7'>{i.NiazArazi}</td>
                                                            <td  className='style7'>{i.NiazGolshahr}</td>
                                                            <td  className='style7'>{i.NiazOnline}</td>
                                                            <td  className='style7'>{i.NiazKFP}</td>
                                                            
                                                            
                                                        </tr>
                                                        )
                                                        
                                                    })
                                                    :
                                                null
                                            }
                                        </tbody>
                                </Table>            
                            }
                        </>
                    :null
                }

             
            </Row>


            

                
            {/* <Row>
                {
                    !Clicked?
                        <>
                            {
                                Loaded? 
                                <div className='loading'/>
                                :

                                <Table >
                                    <thead >
                                            <tr>
                                                <th>
                                                    <p>????????</p>
                                                </th>
                                                <th>
                                                    <p >???? ????????</p>
                                                </th>
                                              
                                                <th>
                                                    <p >?????? ????????</p>
                                                </th>
                                                <th>
                                                    <p >?????????? ???? ??????????</p>
                                                </th>
                                                <th >
                                                    <p >???????????? A</p>
                                                </th>
                                                <th>
                                                    <p>???????????? G</p>
                                                </th>
                                                <th>
                                                    <p>???????????? Online</p>
                                                </th>
                                                <th>
                                                    <p>???????????? ???????? K.F.p</p>
                                                </th>
                                                <th>
                                                    <p> ???????????? ?????????????? K.F.p</p>
                                                </th>
                                                <th >
                                                    <p>???????? A</p>
                                                </th> 
                                                <th >
                                                    <p >???????? G</p>
                                                </th>
                                                <th >
                                                    <p >???????? Online</p>
                                                </th>
                                                <th >
                                                    <p >???????? API</p>
                                                </th>
                                                <th>
                                                    <p >?????????????? ??????????</p>
                                                </th>
                                                <th>
                                                    <p>??????????</p>
                                                </th>
                                                
                                                <th >
                                                    <p>?????????????? A</p>
                                                </th>
                                                <th >
                                                    <p>?????????????? G</p>
                                                </th>
                                                <th>
                                                    <p>?????????????? ????</p>
                                                </th>
                                                <th  sty>
                                                    <p>???????? A</p>
                                                </th>
                                                <th  sty>
                                                    <p>???????? G</p>
                                                </th>
                                                <th  sty>
                                                    <p>???????? Online</p>
                                                </th>
                                                <th  sty>
                                                    <p>???????? API</p>
                                                </th>
                                                
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                TahlilResult.length>0?
                                                TahlilResult.map((i, j)=>{
                                                    return(
                                                        <tr key='1'>
                                                            <td >{j+1}</td>
                                                            <td >{i.GoodsCode}</td>
                                                            
                                                            <td >{i.GoodsName}</td>
                                                            <td >{i.CartonType}</td>
                                                            <td >{i.AraziCardex}</td>
                                                            <td >{i.GolshahrCardex}</td>
                                                            <td >{i.APICardex}</td>
                                                            <td >{i.KFPMainCardex.toFixed(2)}</td>
                                                            <td >{i.KFPQaurantineCardex.toFixed(2)}</td>
                                                            <td >{i.DC1Sale.toFixed(2)}</td>
                                                            <td >{i.DC2Sale.toFixed(2)}</td>
                                                            <td >{i.DC3Sale.toFixed(2)}</td>
                                                            <td >{i.KFpSale.toFixed(2)}</td>
                                                            <td>{i.OrderSuggestion.toFixed(2)}</td>
                                                            <td>
                                                                <input type="text"  
                                                                min={
                                                                    `${i.GoodsRef},${i.GoodsCode},${i.GoodsName},${i.CartonType},${i.isRegisteredInKFP},${i.DC1Sale},${i.DC2Sale},${i.DC3Sale},${i.KFpSale},${i.AraziCardex},${i.GolshahrCardex},${i.APICardex},${i.KFPMainCardex},${i.KFPQaurantineCardex},${i.DoNotOrder},${i.DoNotOrderArazi},${i.DoNotOrderGolshahr},${i.NiazArazi},${i.NiazGolshahr},${i.NiazOnline},${i.NiazKFP},${i.OrderSuggestion},`
                                                                } 
                                                                max={i.GoodsName}
                                                                id={i.GoodsRef} name="sefareshat" onClick={(e)=>SendSefaresh(i.GoodsRef, i.GoodsCode, i.GoodsName, e.target.value)}
                                                                style={{width:"70px", height:"30px", border:"1px solid orange", borderRadius:"10px", textAlign:"center", fontSize:"14px"}}
                                                                />
                                                            </td>
                                                            <td >{i.DoNotOrderArazi}</td>
                                                            <td >{i.DoNotOrderGolshahr}</td>
                                                            <td >{i.DoNotOrder}</td>
                                                            <td >{i.NiazArazi.toFixed(2)}</td>
                                                            <td >{i.NiazGolshahr.toFixed(2)}</td>
                                                            <td >{i.NiazOnline.toFixed(2)}</td>
                                                            <td >{i.NiazKFP.toFixed(2)}</td>
                                                            
                                                        </tr>
                                                        )
                                                        
                                                    })
                                                    :
                                                null
                                            }
                                        </tbody>
                                </Table>            
                            }
                        </>
                    :null
                }
            </Row>

            <Table id="table-to-xls-sefaresh" style={{display:"none"}}>
                <thead >
                        <tr>
                            <th>
                                <p >????????</p>
                            </th>
                            <th>
                                <p>???? ????????</p>
                            </th>
            
                            <th>
                                <p>?????? ????????</p>
                            </th>
                            <th>
                                <p>?????????? ???? ??????????</p>
                            </th>
                            <th >
                                <p>???????????? A</p>
                            </th>
                            <th >
                                <p>???????????? G</p>
                            </th>
                            <th >
                                <p >???????????? Online</p>
                            </th>
                            <th >
                                <p >???????????? ???????? K.F.p</p>
                            </th>
                            <th >
                                <p > ???????????? ?????????????? K.F.p</p>
                            </th>
                            <th >
                                <p >???????? A</p>
                            </th> 
                            <th >
                                <p>???????? G</p>
                            </th>
                            <th >
                                <p >???????? Online</p>
                            </th>
                            <th >
                                <p >???????? API</p>
                            </th>
                            <th>
                                <p >?????????????? ??????????</p>
                            </th>
                           
                            
                            <th >
                                <p >?????????????? A</p>
                            </th>
                            <th >
                                <p >?????????????? G</p>
                            </th>
                            <th >
                                <p >?????????????? ????</p>
                            </th>
                            <th  >
                                <p >???????? A</p>
                            </th>
                            <th  >
                                <p >???????? G</p>
                            </th>
                            <th  >
                                <p >???????? Online</p>
                            </th>
                            <th  >
                                <p >???????? API</p>
                            </th>
                            
                        </tr>
                    </thead>

                    <tbody>
                        {
                            TahlilResult.length>0?
                            TahlilResult.map((i, j)=>{
                                return(
                                    <tr key='1'>
                                        <td >{j+1}</td>
                                        <td >{i.GoodsCode}</td>
                                        
                                        <td >{i.GoodsName}</td>
                                        <td >{i.CartonType}</td>
                                        <td ><p style={{margin:"0"}}>{i.AraziCardex}</p></td>
                                        <td ><p style={{margin:"0"}}>{i.GolshahrCardex}</p></td>
                                        <td ><p style={{margin:"0"}}>{i.APICardex}</p></td>
                                        <td >{i.KFPMainCardex}</td>
                                        <td >{i.KFPQaurantineCardex}</td>
                                        <td >{i.DC1Sale}</td>
                                        <td >{i.DC2Sale}</td>
                                        <td >{i.DC3Sale}</td>
                                        <td >{i.KFpSale}</td>
                                        <td>{i.OrderSuggestion}</td>
                                       
                                        <td >{i.DoNotOrderArazi}</td>
                                        <td >{i.DoNotOrderGolshahr}</td>
                                        <td >{i.DoNotOrder}</td>
                                        <td >{i.NiazArazi}</td>
                                        <td >{i.NiazGolshahr}</td>
                                        <td >{i.NiazOnline}</td>
                                        <td >{i.NiazKFP}</td>
                                        
                                    </tr>
                                    )
                                    
                                })
                                :
                            null
                        }
                    </tbody>
            </Table>   */}

            {/* <Modal isOpen={EndedModal}>
                <ModalBody>
                    {EndedResult.message}
                </ModalBody>
                <ModalFooter>
                    <Button onClick={()=>window.location.reload()}>????????</Button>
                </ModalFooter>
            </Modal> */}
        </>
      
      
    );
};

export default TahlilSefareshat;