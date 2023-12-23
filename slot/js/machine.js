
document.addEventListener("DOMContentLoaded", function(event) {
    const betButton = document.getElementById("bet-button");
    const creditsDisplay = document.getElementById("credits-display");
    const isBalance = document.getElementById("is_balance");


    let credits = 10000;
    var win = false;

    betButton.addEventListener("click", function() {
        // 获取下注金额
        const betAmount = parseInt(document.getElementById("bet-input").value);
        // 检查是否有足够的信用点数下注
        if (betAmount > credits) {
            alert("餘額不足！");
            isBalance.textContent = "NO BALANCE";
        }
        else if(betAmount <= 100 ){
            alert("下注過少");
        }
        else {
            if(!is_roll){
                rollAll();
                credits -= betAmount;
                document.getElementById("credits-display").textContent = credits ;
                document.getElementById("is_balance").textContent = winCls;
                
                if(winCls == "win2"){
                    document.getElementById("jackpot").textContent = betAmount * 5 //倍率看圖案
                }       
            }           
        }

    });

});
