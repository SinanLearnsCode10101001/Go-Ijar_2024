import { useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import logo from "./images/logo_go-ijar.png"

const VehicleReceipt = () => {

    const [loader, setLoader] = useState(false)

    const currentDate = new Date().toLocaleDateString();

    const downloadPDF = () => {
        const capture = document.querySelector('.pdf-container')
        setLoader(true)
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png')
            const doc = new jsPDF('p', 'mm', 'a4')
            const componentWidth = doc.internal.pageSize.getWidth()
            const componentHeight = doc.internal.pageSize.getHeight()
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight)
            setLoader(false)
            doc.save('receipt.pdf')
        })
    }

    return (
      <>
        {/* // <div className='economy_body' style={{justifyContent: 'center'}}> */}
            {/* <div className='buttons_spacing' style={{justifyContent: 'center'}}> */}
                <div className='pdf-container'>
                   {/* style={{ position: 'absolute', left: '-9999px' }}             */}
      <header style={{textAlign: 'center'}}>
      <img src={logo} className="logo" alt="logo" style={{position: 'absolute', left: '12em', top: '15em'}}/>
        <h1>Rental Vehicle & Equipment</h1><br/>
        <h2>Receipt</h2>
      </header><br/><br/>
      <h3>Date: {currentDate}</h3>
      <br/><br/><br/>
      <section style={{lineHeight: '1.5em'}}>
        <h3>Customer Details</h3><br/>
        <p><strong>Name:</strong> {}</p>
        <p><strong>User ID:</strong> </p><br/>
      </section>
      <section style={{lineHeight: '1.5em'}}>
        <h3>Order Details</h3><br/>
        <p><strong>Order ID:</strong> {}</p>
        <p><strong>Item:</strong> {}</p>
        <p><strong>Rental Duration:</strong> {}</p>
        <p><strong>Total Price:</strong> {}</p>
      </section><br/><br/><br/>
        <section style={{justifyContent: 'center', display: 'flex'}}>
      <table className='PDF-table'>
          <thead>
            <tr>
              <th className='PDF-table-rows'>No.</th>
              <th className='PDF-table-rows'>Item</th>
              <th className='PDF-table-rows'>Order ID</th>
              <th className='PDF-table-rows'>User ID</th>
              <th  className='PDF-table-rows'>Total Price</th>
            </tr>
          </thead>
              <tr >
                <td>cvaeva</td>
                <td>bafbdasafvagevqegqa</td>
                <td>afba</td>
                <td>barbfa</td>
                <td>bafba</td>
              </tr>
        </table>
        </section><br/><br/><br/>
      <footer>
        <p>Thank you for your business!</p>
        <p>For any inquiries, please contact us at support@rentalvehiclewebsite.com</p>
      </footer>
    

                </div>
            {/* </div> */}
            <button className='default' style={{width: '200px'}}
            onClick={downloadPDF}
            disable={(!loader===false)}>
                {loader ? (
                    <span>Downloading...</span>
                ):(
                    <span>Download Receipt</span>
                )

                }


            </button>

        {/* // </div> */}
        </>
    );
}
 
export default VehicleReceipt;