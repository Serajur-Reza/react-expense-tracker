import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';
import './style.scss'

const MonthView = () => {

    const history = useSelector((state: any) => state.persistedReducer.history)
    const [month, setMonth] = useState('')
    const [monthlyData, setMonthlyData] = useState<any>([])
    const handleChange = (e: any) => {
        setMonth(e.target.value)
    }

    useEffect(()=>{
        if(month){
            const tempMonthlyData = [];
            let sumIncome = 0, sumExpense = 0, sumSavings = 0;
            for(let i = 0 ; i< history.length; i++){
                console.log("date type:", typeof history[i].timeAdded)
                if(history[i].timeAdded.includes(month)){
                    if(history[i].type === "income" ){
                        sumIncome = sumIncome + history[i].amount;
                    }
                    else if(history[i].type === "expense"){
                        sumExpense = sumExpense + history[i].amount;
                    }
                    else{
                        sumSavings = sumSavings + history[i].amount;
                    }
                }
            }

            tempMonthlyData.push({value: sumIncome, name: "income"})
            tempMonthlyData.push({value: sumExpense, name: "expense"})
            tempMonthlyData.push({value: sumSavings, name: "savings"})
            console.log("tempMonthlyData:", tempMonthlyData)
            setMonthlyData(tempMonthlyData)
            
            console.log(month)
        }

        // else{
        //     const tempMonthlyData = history.filter((item: any)=> item.timeAdded.includes(month))
        // }

    },[month])

    const option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            left: "center",
            top: 'top',
            data: ['January','Febuary','March','April','May', "June", "July", "August", "September", "October", "November", "December"]
        },
        series : [
            {
            name: 'Monthly Data',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: monthlyData,
          itemStyle: {
            emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            marginTop: 10
            }
          }
            }
        ]
    };

    return (
        <div className='body'>
            <h1>Data Charts</h1>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Month</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={"January"}>January</MenuItem>
                    <MenuItem value={"February"}>February</MenuItem>
                    <MenuItem value={"March"}>March</MenuItem>
                    <MenuItem value={"April"}>April</MenuItem>
                    <MenuItem value={"May"}>May</MenuItem>
                    <MenuItem value={"June"}>June</MenuItem>
                    <MenuItem value={"July"}>July</MenuItem>
                    <MenuItem value={"August"}>August</MenuItem>
                    <MenuItem value={"September"}>September</MenuItem>
                    <MenuItem value={"October"}>October</MenuItem>
                    <MenuItem value={"November"}>November</MenuItem>
                    <MenuItem value={"December"}>December</MenuItem>
                </Select>
            </FormControl>

            <ReactECharts
                option={option}
                style={{ height: 400, marginTop: 20 }}
                // onChartReady={onChartReady}
                // onEvents={{
                // 'click': onChartClick,
                // 'legendselectchanged': onChartLegendselectchanged
                // }}
            />
        </div>
    );
};

export default MonthView;