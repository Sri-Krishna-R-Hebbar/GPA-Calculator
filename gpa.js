let subject = document.querySelector(".sub");
let semester = document.getElementById("sem");
let formDetails = document.querySelector(".allform");
let subSelect = document.getElementById("subjects");
let inputDiv = document.querySelector(".allInputs");
let details = document.querySelector(".details");
let body = document.querySelector(".body");
let download = document.querySelector(".download");
let sum =0;

function timeout()
{
    setTimeout(function()
    {
        body.style.backgroundColor = "";
    } , 5000)
}

function timeoutImage()
{
    setTimeout(function()
    {
        body.style.backgroundImage = "";
    } , 5000)
}

function addDownload()
{
    details.innerHTML += `<button onclick="downloadScore()" style="background-color:#3498db; color: #fff;padding: 10px 15px;border: none;border-radius: 4px;cursor: pointer;">Download Scorecard</button>`
}

function showSubjects() {
    let subSelect = document.getElementById("subjects");
    if (semester.value !== "") {
        subject.style.display = "block";
        subSelect.innerHTML = ""; 
        var allSubs = getSem(parseInt(semester.value));
        subSelect.innerHTML = '<option value="" disabled selected>Select Subject</option>';
        allSubs.forEach(function (sub) {
            var option = document.createElement("option");
            option.value = sub;
            option.textContent = sub;
            subSelect.appendChild(option);
        });
    } else {
        subject.style.display = "none";
    }
}

function showDetails() {
    if(subSelect.value ===`All Sem ${semester.value} Subjects`)
    {
        formDetails.style.display ='block';
        formDetails.innerHTML ='';
        var allSubs = getSem(parseInt(semester.value));
        for(let i=1 ; i<allSubs.length ; i++)
        {
            formDetails.innerHTML += `<label for="${i}" style="font-size: 18px; color :black ; margin-top: 10px;">Enter the marks of ${allSubs[i]}:</label>
            <input type="number" name="${i}" id="${i}" min="0" max="100" required>`
        }
        formDetails.innerHTML += `<input type="submit" value="Get GPA" style ="display :block ; margin-top: 20px;" id="gpa" onclick="getGpa()">`
    }
    else if(subSelect.value=='')
    {
        formDetails.style.display = 'none';
    }
    else 
    {
        formDetails.style.display = 'block';
        formDetails.innerHTML = `<label for="one" style="font-size: 18px; color :black ; margin-top: 10px;">Enter the marks of ${subSelect.value}:</label>
        <input type="number" name="one" id="one" min="0" max="100" required>
        <input type="submit" value="Get Percentage" style ="display :block ; margin-top: 20px" id="percent" onclick="getPercent()">`
    }
}

function getGpa()
{
    sum =0;
    var allSubs = getSem(parseInt(semester.value));
    for(let i=1 ; i<allSubs.length ; i++)
    {
        let id= [];
        id[i] = document.getElementById(i).value;
        sum = sum + parseInt(id[i]);
    }
    let per = parseFloat(sum/((allSubs.length-1)*100));
    let percent = Math.round(per*1000)/10;
    let gpaCalc = Math.round(per*100)/10;
    details.style.display ="block";
    details.innerHTML = "";
    details.innerHTML =`<p id="per" style="margin:10px 0 10px 0;"><b>Percentage :</b> ${percent}%</p>
    <p id="gpaCalculated" style="margin:10px 0 10px 0;"><b>GPA :</b> ${gpaCalc}</p>`
    if(gpaCalc>=9)
    {
        body.style.backgroundImage = "linear-gradient(to right, #1338BE, #9acd32, #ff6347, #ff4500, #ff8c00, #ffd700)";
        details.innerHTML += `<p class="congrats" style="text-align: center;font-weight: 900;color :blue;">Congratulations🎉</p>`;
        addDownload();
        timeoutImage();
    }
    else if(gpaCalc <9 && gpaCalc>=8)
    {
        body.style.backgroundColor = "#03AC13";
        details.innerHTML += `<p class="good" style="text-align: center;font-weight: 900;color :gold;">Good✨</p>`;
        addDownload();
        timeout();
    }
    else if(gpaCalc <8 && gpaCalc>=7)
    {
        body.style.backgroundColor = "#FFF44F";
        addDownload();
        timeout();
    }
    else if(gpaCalc <7 && gpaCalc>6)
    {
        body.style.backgroundColor = "#E3242B";
        addDownload();
        timeout();
    }
    else if(gpaCalc <=6 && gpaCalc>4)
    {
        body.style.backgroundColor = "#710C04";
        addDownload();
        timeout();
    }
    else if(gpaCalc<=4)
    {
        details.innerHTML += `<p class="fail" style="text-align: center;font-weight: 900;color :red;">Fail</p>`
        addDownload();
    }
}

function getPercent()
{
    let required = document.getElementById("one").value;
    let percent = Math.round((required/100)*1000)/10;
    details.style.display ="block";
    details.innerHTML = "";
    details.innerHTML =`<p id="per" style="margin:10px 0 10px 0;"><b>Percentage :</b> ${percent}%</p>`
    if(percent>=90)
    {
        body.style.backgroundImage = "linear-gradient(to right, #1338BE, #9acd32, #ff6347, #ff4500, #ff8c00, #ffd700)";
        details.innerHTML += `<p class="congrats" style="text-align: center;font-weight: 900;color :blue;">Congratulations🎉</p>`;;
        addDownload();
        timeoutImage();
    }
    else if(percent <90 && percent>=80)
    {
        body.style.backgroundColor = "#03AC13";
        details.innerHTML += `<p class="good" style="text-align: center;font-weight: 900;color :gold;">Good✨</p>`;
        addDownload();
        timeout();
    }
    else if(percent <80 && percent>=70)
    {
        body.style.backgroundColor = "#FFF44F";
        addDownload();
        timeout();
    }
    else if(percent <70 && percent>60)
    {
        body.style.backgroundColor = "#E3242B";
        addDownload();
        timeout();
    }
    else if(percent <=60 && percent>40)
    {
        body.style.backgroundColor = "#710C04";
        addDownload();
        timeout();
    }
    else if(percent<=40)
    {
        details.innerHTML += `<p class="fail" style="text-align: center;font-weight: 900;color :red;">Fail</p>`;
        addDownload();
    }
}

function downloadScore() {
    if (subSelect.value === `All Sem ${semester.value} Subjects`) {
        var allSubs = getSem(parseInt(semester.value));
        var content = `Marks scored in Semester ${semester.value}:\n`;
        for (let i = 1; i < allSubs.length; i++) {
            let id = [];
            id[i] = document.getElementById(i).value;
            content += `${allSubs[i]} = ${id[i]}\n`;
        }
        let per = parseFloat(sum / ((allSubs.length - 1) * 100));
        let percent = Math.round(per * 1000) / 10;
        let gpaCalc = Math.round(per * 100) / 10;
        content += `Percentage : ${percent}\nGPA : ${gpaCalc}\n`;

        if (gpaCalc >= 9) {
            content += `Congratulations🎉\n`;
        } else if (gpaCalc < 9 && gpaCalc >= 8) {
            content += `Good✨\n`;
        } else if (gpaCalc <= 4) {
            content += `Fail\n`;
        }

        var blob = new Blob([content], { type: 'text/plain' });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'scorecard.txt';
        link.click();
    } else {
        var content = `Marks scored in ${subSelect.value}:`;
        var oneInput = document.getElementById("one").value;
        content += `${oneInput}\n`;
        let percent = Math.round((oneInput / 100) * 1000) / 10;

        content += `Percentage : ${percent}%\n`;
        if (percent >= 90) {
            content += `Congratulations🎉\n`;
        } else if (percent < 90 && percent >= 80) {
            content += `Good✨\n`;
        } else if (percent <= 40) {
            content += `Fail\n`;
        }

        var blob = new Blob([content], { type: 'text/plain' });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'scorecard.txt';
        link.click();
    }
}


function getSem(sem) {
    switch (sem) {
        case 1:
            return ["All Sem 1 Subjects", "FPC(Fundamentals of Programming with C)", "IMCS(Introduction to Maths for CS)", "IWD(Introduction to Web Designing)", "DAP(Data Analysis with Python)", "DSCA(Digital Systems and Computer Architecture)", "ES-1(Exploring Science-1)", "SI(Structured Innovation)"];
        case 2:
            return ["All Sem 2 Subjects", "DSA(Data Structures and Algorithms)", "ESM(Embedded Systems and Microcontrollers)", "WT(Web Technologies)", "LA(Linear Algebra)", "EE(Engineering Explorations)", "ES-2(Exploring Science-2)", "EM(Entrepreneurial Mindset)"];
        case 3:
            return ["All Sem 3 Subjects", "DAA(Design and Analysis of Algorithms)", "OSSS(Operating Systems and Systems Software)", "DBMS(Data Base Management System)", "PS(Probability and Statistics)", "ASE(Agile Software Engineering)", "Minor-1"];
        case 4:
            return ["All Sem 4 Subjects", "CN-IoT(Computer Network and IoT)", "DSML(Data Science and Machine Learning)", "OOPS(Object Oriented Programming System)", "Calculus", "Minor-2", "Minor-3"];
        case 5:
            return ["All Sem 5 Subjects", "TC(Theory Of Computation)", "Cyber Security", "Mobile Computing", "Elective-1", "Elective-2", "Minor-4", "Minor-5"];
        case 6:
            return ["All Sem 6 Subjects", "CD(Compiler Design)", "Interdisciplinary Project 1", "Quantitative Reasoning", "Elective-3", "Elective-4", "Minor-6"];
        case 7:
            return ["All Sem 7 Subjects", "MOOC-1/Internship", "Interdisciplinary Project 2", ">Elective-5/Internship", "CS Elective-1", "CS Elective-2"];
        case 8:
            return ["All Sem 8 Subjects", "MOOC-2/Internship", "Interdisciplinary Project 3", "Elective-6/Internship"];
        default:
            return [];
    }
}
