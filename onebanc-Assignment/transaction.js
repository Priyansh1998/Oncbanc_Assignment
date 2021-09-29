async function getTransactions() {
    const url = 'https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2';
    const response = await fetch(url);
    var data = await response.json();
    const dateSet = getDateSet(data.transactions);

    let html = ``;

    for (i of dateSet) {
        html += `
        <h2> <span>${i}</span> </h2>`;
        for (a of data.transactions) {
            let temp = new Date(a.startDate);
            let displayDate = moment(temp).format('Do MMM YYYY, h:mm a');
            let localeString = temp.toLocaleDateString();
            if (i === localeString) {

                if (a.type == 1 && a.direction == 1) {
                    html += `
                    <div class="transaction-container align-right">
                    <div class="transaction-box">
                    <div class="row">
                    <div class="col-8 transaction-amount">₹ ${a.amount}</div>
                    <div class="col-4 transaction-status"> ✔️ You paid</div>
                    </div>
                    <div class="row">
                    <div class="col-10 transaction-id">
                    <span>Transaction ID</span>
                    <span>A12345156256787382783899</span>
                    </div>
                    <div class="col-2 transaction-details"> 
                    <button onclick="location.href='https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2'"> > </button>
                    <script type="text/javascript">
                        document.getElementById("myButton").onclick = function ();
                    </script> 
                    </div>
                    </div>
                    </div>
                    <span class="transaction-datetime">${displayDate}
                    </span>
                    </div>
                    `;
                } else if (a.type == 1 && a.direction == 2) {
                    html += `
                    <div class="transaction-container align-left">
                    <div class="transaction-box">
                    <div class="row">
                    <div class="col-6 transaction-amount">₹ ${a.amount}</div>
                    <div class="col-6 transaction-status"> ✔️ You Received</div>
                    </div>
                    <div class="row">
                    <div class="col-10 transaction-id">
                    <span>Transaction ID</span>
                    <span>A12345156256787382783899</span>
                    </div>
                    <div class="col-2 transaction-details"> 
                    <button onclick="location.href='https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2'"> > </button>
                    <script type="text/javascript">
                        document.getElementById("myButton").onclick = function ();
                    </script>
                    </div>
                    </div>
                    </div>
                    <span class="transaction-datetime">${displayDate}
                    </span>
                    </div>
                    `;
                } else if (a.type == 2 && a.direction == 1) {
                    html += `
                    <div class="transaction-container align-right">
                    <div class="transaction-box">
                    <div class="row">
                    <div class="col-6 transaction-amount">₹ ${a.amount}</div>
                    <div class="col-6 transaction-status"> 🔗 You Requested</div>
                    </div>
                    <div class="row">
                    <div class="col-10 requested">
                    <div class="cancel-button">
                    <button onclick="location.href='http://127.0.0.1:5500/image.html'"> Cancel </button>
                    <script type="text/javascript">
                        document.getElementById("myButton").onclick = function ();
                    </script> </div>
                    </div>
                    <div class="col-2 transaction-details"> 
                    <button onclick="location.href='https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2'"> > </button>
                    <script type="text/javascript">
                        document.getElementById("myButton").onclick = function ();
                    </script> </div>
                    </div>
                    </div>
                    <span class="transaction-datetime">${displayDate}
                    </span>
                    </div>
                    `;
                } else if (a.type == 2 && a.direction == 2) {
                    html += `
                    <div class="transaction-container align-left">
                    <div class="transaction-box">
                    <div class="row">
                    <div class="col-7 transaction-amount">₹ ${a.amount}</div>
                    <div class="col-5 transaction-status"> 🔗 Request Received</div>
                    </div>
                    <div class="row">
                    <div class="col-10 pay-decline">
                    <div class="pay"><button onclick="location.href='http://127.0.0.1:5500/pay.html'"> Pay </button>
                    <script type="text/javascript">
                    document.getElementById("myButton").onclick = function ();
                    </script></div>
                    <div style="flex-grow: 1"></div>
                    <div class="decline">
                    <button onclick="location.href='http://127.0.0.1:5500/decline.html'"> Decline </button>
                    <script type="text/javascript">
                        document.getElementById("myButton").onclick = function ();
                    </script> 
                    </div>
                    </div>
                    <div class="col-2 transaction-details"> 
                    <button onclick="location.href='https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2'"> > </button>
                    <script type="text/javascript">
                        document.getElementById("myButton").onclick = function ();
                    </script> </div>
                    </div>
                    </div>
                    <span class="transaction-datetime">${displayDate}
                    </span>
                    </div>
                    `;
                }

            }
        }
    }

    document.getElementById("transaction-data").innerHTML = html;

    console.log(data);

}

function getDateSet(data) {
    let arr = [];
    data.forEach((date) => {
        const temp = new Date(date.startDate);
        let res = arr.filter(item => item === temp.toLocaleDateString());
        if (res.length == 0) {
            arr.push(temp.toLocaleDateString());
        }
    });
    return arr;
}

getTransactions();