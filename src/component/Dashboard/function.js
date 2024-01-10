import logo from './logo.png';
import { jsPDF } from "jspdf";

export default  function downloadinvoice (userdata){
    var doc = new jsPDF('landscape','px','a4');
    doc.addImage(logo,'PNG',65,20,70,50);
    doc.setFont("Helvertica" , 'bold');
    doc.text(`Username : `+`${userdata["username"]}`,60,100);
    doc.text(`Fullname : `+`${userdata["firstname"]}`+` `+`${userdata["lastname"]}`,60,120);
    doc.text(`Email : `+`${userdata["email"]}`,60,140);
    doc.text(`PaymentAmound : `+'$'+`${userdata["totalcredit"]}`,60,160);
    doc.save(`${userdata["firstname"]}`+` `+`${userdata["lastname"]}`+`_knowwizesol_Invoice.pdf`);
  }