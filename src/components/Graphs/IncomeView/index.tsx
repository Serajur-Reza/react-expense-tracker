import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactECharts from 'echarts-for-react';

const IncomeView = () => {

    const history = useSelector((state: any)=> state.persistedReducer.history)
    const [expenseData, setExpenseData] = useState<any>([])

    useEffect(()=>{
        const tempMonthlyData = [], tempData= [];
        const optionSet = new Set()
        //optionSet.add(1);
        for(let i = 0 ; i< history.length; i++){
            if(history[i].type === "income"){
                tempData.push({value: parseFloat(history[i].amount), name: history[i].category})
                optionSet.add(history[i].category)
            }
        }

        console.log("tempData:", tempData)
        for(let j of optionSet){
            let categorySum = 0;
            for(let i = 0 ; i< tempData.length; i++){
                if(j === tempData[i].name){
                    categorySum = categorySum + tempData[i].value
                }
            }
            tempMonthlyData.push({value: categorySum, name: j })
        }

        console.log("tempMonthlyFIlterdata:", tempMonthlyData)
        
        if(expenseData.length !== tempMonthlyData.length){
            setExpenseData(tempMonthlyData)
        }
        //console.log(expenseData)
    },[history, expenseData])

    const option = {
        // title : {
        //   text: '某站点用户访问来源',
        //   subtext: '纯属虚构',
        //   x:'center'
        // },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left',
        //   data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        // },
        series : [
          {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:expenseData,
          itemStyle: {
            emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
          }
        ]
      };
    return (
        <div>
            <h1>Income</h1>

            <ReactECharts
                option={option}
                style={{ height: 400 }}
        // onChartReady={onChartReady}
        // onEvents={{
        //   'click': onChartClick,
        //   'legendselectchanged': onChartLegendselectchanged
        //  }}
            />
        </div>
    );
};

export default IncomeView;