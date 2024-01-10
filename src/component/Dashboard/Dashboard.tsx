import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from'react-router-dom'
import { Button } from 'react-bootstrap';
import CsvDownloadButton from 'react-json-to-csv'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import logo from './logo.png'
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler,
  } from 'chart.js';
import { Pie ,Doughnut,Line } from 'react-chartjs-2';
import downloadinvoice from './function'
ChartJS.register(ArcElement, Tooltip, Legend,CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Filler
    );

interface props{
    user: String
    changeuser: Function
}

interface Itoken {
    no:number
    modelname: string
    type: string
    Usage: number
    inorout:string
    date:string
    month:string
    year:string
    currentrate:number
 }

 interface IUser {
    firstname:string,
    lastname:string,
    username:string,
    email:string,
    password:string,
    totalcredit:number,
    usedcredit:number,
  }
//  interface linedata [string , number]
const Dashboard: React.FC<props> = ({user , changeuser})=> {

    const [month,setmonth]=useState((new Date().getMonth() + 1).toString());
    const [year,setyear]=useState((new Date().getFullYear()).toString());

    let iuser:IUser = {
        firstname:"",
        lastname:"",
        username:"",
        email:"",
        password:"",
        totalcredit:0,
        usedcredit:0,
      }
    const [userdata,setuserdata]=useState(iuser);
    const [modelcosts , setmodelcosts] = useState([]);  
    let initialtokens: Itoken[] = [{no:0,modelname:"s",type:"s",Usage:1,inorout:"s",date:"",month:"0",year:"1",currentrate:1}]
    const [userstokens , setuserstokens] = useState(initialtokens);
    const [costclick , setcostclick] = useState(true);
    
    const [usedcost , setusedcost] = useState(0);
    const [totalcost , settotalcost] = useState(0);
    let temp:(string | number)[][] =[['3 Jan' , 0.109],['6 Jan' , 2.014]]
    const [linedatacost , setlinedatacost] = useState(temp);
    let s: string[] =[]
    const [labels , setlabels] = useState(s);
    const [datacost , setdatacost] = useState(temp);
    temp = [['3 Jan' , 1],['6 Jan' , 2]];
    const [activity , setactivity] = useState(temp);
    const [graphlabel , setgraphlabel] = useState("Costs vs Date");
    let getmodelcosts = async()=>{
        const baseurl :string = (process.env.REACT_APP_BACKENDURL as string)
        const response = await axios.get(`${baseurl}/api/modelcosts/`)
        setmodelcosts(response.data);
    }

    let getuserdata = async()=>{
        try {
            const baseurl :string = (process.env.REACT_APP_BACKENDURL as string)
            const response = await axios.get(`${baseurl}/api/user/data/${user}`)
            setuserdata(response.data);
            settotalcost((response.data)['totalcredit']);
        } catch (error) {
            console.log("eror");
        }

    }

    let getusertokens = async()=>{
        try {
            const baseurl :string = (process.env.REACT_APP_BACKENDURL as string)
            const response = await axios.get(`${baseurl}/api/userstokens/${user}`)
            const data= response.data.tokens;
            let token: Itoken[] = [];
            let totalusedcost = 0;
            for(let i=0;i<data.length;i++){
                const dateObject = new Date(data[i]["timestamp"]);
                token.push({
                    no:i,
                    modelname:data[i]["modelname"],
                    type: data[i]["type"],
                    Usage: data[i]["Usage"],
                    inorout:data[i]["inorout"],
                    date:(dateObject.getDate()).toString(),
                    month:(dateObject.getMonth() + 1).toString(),
                    year:(dateObject.getFullYear()).toString(),
                    currentrate:data[i]["currentrate"]
                })
                totalusedcost+=Math.ceil((data[i]["currentrate"]*data[i]["Usage"])*Math.pow(10, 4)) / Math.pow(10, 4);
            }
            setuserstokens(token);
            setusedcost(totalusedcost);
        } catch (error) {
            console.log(error);
        }
       
    }

    const handlechange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
        setmonth(e.target.value);
    }

    const handlechangeyear=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setyear(e.target.value)
    }

    useEffect(() => {
        getmodelcosts();
        getusertokens();
        getuserdata();

    }, []);

    useEffect(()=>{
        generatelabel();
        generatedata();
    },[month])
    useEffect(()=>{
        generatelabel();
        generatedata();
    },[year])
    const spendcalulate = (one:number , two:number)=>{
        let ans = Math.ceil((one*two)*Math.pow(10, 4)) / Math.pow(10, 4);
        return ans;
    }

    // charts

    const data = {
    labels : ['Used-Credits', 'Remain-Credits'],
    datasets : [
        {
          label: '$',
          data: [usedcost,totalcost-usedcost],
          backgroundColor: [
            "#BE0E3D",
            "#2B5797",
          ],
          borderColor: [
            "rgba(0,0,255,1.0)",
            "rgba(0,0,255,0.8)",
          ],
          borderWidth: 0,
            
        },
      ],
      type: 'doughnut', 
    }



      const monthdays =[['Jan',31],['Feb',28],['Mar',31],['Apr',30],['May',31],['Jun',30],['Jul',31],['Aug',31],['Sep',30],['Oct',31],['Nov',30],['Dec',31]]
      const days =[31,28,31,30,31,30,31,31,30,31,30,31]

      const generatelabel = async ()=>{
        let currmonth = monthdays[parseInt(month)-1][0];
        let noofdays = days[parseInt(month)-1];
        if(currmonth=='Feb' && (parseInt(year)%4==0)){
            noofdays = 29;
        }
        let  t = new Array(noofdays);
        // setlabels([]);
        for(let i=0;i<noofdays;i++){
           t[i] = (`${i+1}`+' '+`${currmonth}`)
            // setlabels({...labels,`${i}`+' '+`${currmonth}`});
        }
        //  labels = t;
        // setlabels([]);
        setlabels(t);
      }

    // Line plot costs 
    const optionlineplot = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: graphlabel,
          },
        },
      };

      let datalineplot = {
        labels,
        datasets: [
          {
            fill: true,
            label: datacost==linedatacost?'Cost':'Activity',
            data: linedatacost,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

      const generatedata = ()=>{
            // filter by month
            let filtermonth = userstokens.filter(obj => obj['month'] === month);

            // filter by year
            let filteryear = filtermonth.filter(obj => obj['year'] == year);
            
            let noofdays = days[parseInt(month)-1];

            let t:(string | number)[][] = new Array(noofdays);

            let s:(string | number)[][] = new Array(noofdays);
            for(let index=1;index<=noofdays;index++){
                let filterdate = filteryear.filter(obj => obj['date'] == index.toString())
                
                let currentdatecost = 0;

                for(let i=0;i<filterdate.length;i++){
                    currentdatecost +=spendcalulate(filterdate[i]['Usage'] , filterdate[i]['currentrate']);
                }

                let temp = (`${index}`+' '+`${monthdays[parseInt(month)-1][0]}`);
                t[index-1]=([ temp, currentdatecost]);
                s[index-1]=([temp , ((filterdate.length)/2)]);
            }
            setlinedatacost(t);
            setdatacost(t);
            setactivity(s);
            setgraphlabel("Cost vs Date"); 
      }

  return ( <>

  <div className="container mt-4" >
    <h3>User Dashboard</h3>
    <div className="container-fluid border rounded p-lg-3 p-md-2 p-sm-1 mt-4">
        <div className="row">
            <h3 className='text-lg-start text-center'>Usage</h3>
        </div>
       <div className="row">
        <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-lg-start justify-content-md-start justify-content-sm-center">
            <Button className={`btn btn-success p-2 `} onClick={(e)=>{
                setlinedatacost(datacost);
                setgraphlabel("Cost vs Date");
            }}>Costs</Button>
            <Button className={`btn btn-success mx-2 p-2 `} onClick={(e)=>{
                setlinedatacost(activity);
                setgraphlabel("Response vs Date");
            }}>Activity</Button>
  
        </div>
        <div className="col-lg-6 col-md-6 col-12 d-flex justify-content-lg-end justify-content-lg-end justify-content-lg-center">
            <div className="row mt-2">
                <div className="col-4">
                    <select className="form-select" aria-label="Default select example" onChange={handlechange}  name="month" >
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
                <div className="col-4">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="year" aria-label="year" name="year" onChange={handlechangeyear} value={year}/>
                </div>
                </div>
                <div className="col-4">
                     <CsvDownloadButton data={userstokens} delimiter=";" className={`btn btn-success p-2 `}>Download</CsvDownloadButton>
                </div>
            </div>
            
        </div>
        <div className="row">
            <div className="col-lg-8 col-md-8 col-12 border border-2 mt-3 rounded p-3" >
                    <Line options={optionlineplot} data={datalineplot} style={{ minHeight: '400px', maxHeight: '500px'}}/>
            </div>
            <div className="col-lg-4 col-md-4 col-12">
            <div className="row">
                <div className="col-12 d-flex justify-content-lg-center w-75">
                <Doughnut data={data} className='d-flex justify-content-center'/>
                </div>
                <div className="col-12 mt-3">
                    <Button className='btn btn-success' onClick={(e)=>{downloadinvoice(userdata)}}>Invoice</Button>
                </div>
            </div>
            </div>
        </div>
        <div className="row">
        <table className="table table-striped border mt-5 table-hover">
            <thead>
                <tr >
                <th scope="col">Model</th>
                <th scope="col">Type</th>
                <th scope="col">Usage</th>
                <th scope="col">Rate</th>
                <th scope="col">Spend</th>
                </tr>
            </thead>
            <tbody>
            {userstokens.map(item => (
                <tr key={item.no}>
                <td >{item.modelname}</td>
                <td>{item.type}</td>
                <td>{item.Usage}</td>
                <td>{item.currentrate}</td>
                <th>${spendcalulate(item.Usage , item.currentrate)}</th>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
       </div>
    </div>
  </div>
    </>
  )
}

export default Dashboard;