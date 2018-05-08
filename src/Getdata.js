import React, { Component } from 'react';

class Getdata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            money: 0,
            interest: 6.5,
            month: 0,
            day: 30,
            age:0,
            sumation: [],
            
        }
    }
    
    HandleMoney (event) {
        this.setState({money: parseInt(event.target.value) || 0})
        
    }
    HandleInterest (event) {
        this.setState({interest: parseFloat(event.target.value) || 0.00})
        
    }
    HandleMonth (event) {
        this.setState({month: parseInt(event.target.value)|| 0})
    }
    HandleAge(event){
        let ages = (60 - parseInt(event.target.value)) * 12
        this.setState({age: ages})
    }

    HandleCalculate(event) {
        event.preventDefault()
        if(this.state.age < this.state.month && this.state.age > 0){
            alert("จำนวณการผ่อนชำระเกินอายุ 60 ไม่สามารถทำการกู้ได้")
            window.location.reload();
        }
        else if(this.state.age <= 0) {
            alert("คุณมีอายุครบหรือเกิน 60 ปี ไม่สามารถทำการกู้ได้")
            window.location.reload();
        }
        var money = this.state.money
        var interest = (this.state.interest /100) /12
        var month = this.state.month
        // console.log(money,interest,month)
        var pmt = this.PMT(interest,month,money)
        pmt = Math.abs(pmt)
        // console.log(pmt)
        var tables = this.state.sumation
        for(var i=1 ; i <= this.state.month ; i++) {
            var sumInterest = (money * (this.state.interest/100) *30) /365
            var sumPrinciple = pmt - sumInterest
            if(money <= sumPrinciple) {
                pmt = money + sumInterest
                sumPrinciple = money
                money = 0
                
            }
            else money = money - sumPrinciple
            console.log(money, sumPrinciple, sumInterest)
            var TotalSum = {
                pmt: pmt,
                CalInterest : sumInterest,
                CalPrinciple : sumPrinciple,
                money: money
            }

            tables.push(TotalSum)
        }
        this.setState({sumation: tables})
        console.log(this.state.sumation)
    }



    PMT (rate, nper, pv, fv, type) {
		if (!fv) fv = 0;
		if (!type) type = 0;

		if (rate === 0) return -(pv + fv)/nper;
		
		var pvif = Math.pow(1 + rate, nper);
		var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

		if (type === 1) {
			pmt /= (1 + rate);
		};

		return pmt;
	}

    render() {
      return (
        <div className="calculate">
            <center><h1>โปรแกรมผ่อนชำระเงินกู้</h1></center>
                <div className="container">
                    <form onSubmit={this.HandleCalculate.bind(this)}>
                        <div className="form-group">
                            <label>ยอดเงินกู้ : </label>
                            <input type="text" className="form-control" value={this.state.money} onChange={this.HandleMoney.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label>อัตราดอกเบี้ย (% ต่อปี) :</label>
                            <input type="text" className="form-control" value={this.state.interest} onChange={this.HandleInterest.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label>ผ่อนชำระ (งวด) :</label>
                            <input type="text" className="form-control" value={this.state.month} onChange={this.HandleMonth.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label>อายุผู้กู้</label>
                            <input type="text" className="form-control" onChange={this.HandleAge.bind(this)}/>
                        </div>
                        <button type="submit" className="btn btn-success">คำนวณผล</button>
                    </form>
                
                    <table className="table" align="center" >
                        <thead>
                            <tr>
                                <th scope="col">งวดที่</th>
                                <th scope="col">จำนวนผ่อนชำระต่องวด</th>
                                <th scope="col">ดอกเบี้ย</th>
                                <th scope="col">เงินต้น</th>
                                <th scope="col">เงินต้นคงเหลือ</th>
                            </tr>
                        </thead>
                        <tbody>
                        {this.state.sumation.map((tables, index) =>
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td className="pmt">{tables.pmt.toFixed(2)}</td>
                                <td>{tables.CalInterest.toFixed(2)}</td>
                                <td>{tables.CalPrinciple.toFixed(2)}</td>
                                <td>{tables.money.toFixed(2)}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            
        </div>
      );
    }
  }
  
  export default Getdata;