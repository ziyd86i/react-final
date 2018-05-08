import React, { Component } from 'react';

class Getdata extends Component {
    constructor(props) {
        super();
        this.state = {
            money: 0,
            interest: 6.5,
            month: 0,
            day: 30,
            tableCal: false,
            sumation: [],
            
        }
    }
    
    HandleMoney (event) {
        this.setState({money: parseInt(event.target.value)|| 0})
        
    }
    HandleInterest (event) {
        this.setState({interest: parseFloat(event.target.value)|| 0})
        
    }
    HandleMonth (event) {
        this.setState({month: parseInt(event.target.value)|| 0})
    }
    HandleCalculate () {
        var tables = this.state.sumation
        for(var i=1 ; i <= this.state.month ; i++) {
            var sumInterest = ((this.state.money * this.state.interest/100)*30)/365
            var sumMoney = (this.state.money /this.state.month) - sumInterest
            var newMoney = this.state.money - sumMoney
            var SumAll = sumMoney + sumInterest
         
            var TotalSum = {
                CalInterest : sumInterest,
                CalPayMoney : sumMoney,
                CalNewmoney : newMoney,
                CalTotal: SumAll
            }

            tables.push(TotalSum)
        }
        this.setState({sumation: tables})
        console.log(this.state.sumation)
    }

    render() {
      return (
        <div>
            <h1>โปรแกรมผ่อนชำระเงินกู้</h1>
            <hr />
            <table align = "center">
                <tbody>
                <tr>
                    <td>ยอดเงินกู้ : </td>
                    <td><input  value={this.state.money} onChange={this.HandleMoney.bind(this)}/></td>
                            
                </tr>
                <tr>
                    <td>อัตราดอกเบี้ย (% ต่อปี) :</td>
                    <td><input value={this.state.interest} onChange={this.HandleInterest.bind(this)}/></td>
                                        
                </tr>
                <tr>
                    <td>ผ่อนชำระ (งวด) : </td>
                    <td><input value={this.state.month} onChange={this.HandleMonth.bind(this)}/></td>          
                </tr>
                </tbody>
                
            </table>
            <input type="button" onClick={this.HandleCalculate.bind(this)} value="คำนวณ"/>
            
            <div>
                <table align ="center" border='1'>
                    <thead>
                        <tr>
                            <td>งวดที่</td>
                            <td>เงินกู้คงเหลือ</td>
                            <td>ดอกเบี้ย</td>
                            <td>เงินต้น</td>
                            <td>รวมหัก</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
      );
    }
  }
  
  export default Getdata;