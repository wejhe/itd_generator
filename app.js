function generateITD() {
    const eFile = document.getElementById("jsonFile");
    const file = eFile.files[0];
            
    const reader = new FileReader();
    reader.readAsText(file);
            
    reader.onload = function(event) {
        const json = JSON.parse(event.target.result);
        const resultBody = document.getElementById("resultBody");

        let itemNumber = 1;
        json.forEach(item => {
            const topic = item[0].subject.replace(/\[[A-Z] \([A-Z]{3}\)\]/, '').trim();
            const riskTemp = item[0].subject.match(/\[[A-Z] \([A-Z]{3}\)\]/);
            const risk = riskTemp.toString().replace(/[\[\]]/g, '');
            const criteriaTemp = item[0].message.replace(/\t\*/g, '-').replace(/\n/g, '<br>');
            const criteria = criteriaTemp.replace(/(<br>\s*)+$/, '');
            const factTemp = item[1].message.replace(/\t\*/g, '-').replace(/\n/g, '<br>');
            const fact = factTemp.replace(/(<br>\s*)+$/, '');
            const unitsTemp = fact.match(/\[([A-Z]{3})\]/g);
            const units = unitsTemp.map(unit => unit.slice(1, -1)).join('<br>');
            const responseTemp = item[2].message.replace(/\t\*/g, '-').replace(/\n/g, '<br>');
            const response = responseTemp.replace(/(<br>\s*)+$/, '');

            resultBody.innerHTML += `
                <tr class="align-top">
                    <td>${itemNumber}</td>
                    <td class="text-start">
                        <b>${topic}</b><br><br>
                        <u>Ketentuan dan Kriteria</u><br><br>
                        ${criteria}<br><br>
                        <u>Fakta dan Temuan</u><br><br>
                        ${fact}<br><br>
                        <u>Rekomendasi</u><br><br>
                        <--tulis rekomendasi di sini-->
                    </td>
                    <td>${risk}</td>
                    <td class="text-start">
                        <u>Tanggapan</u><br><br>
                        ${response}<br><br>
                        <u>Target Penyelesaian</u><br><br>
                        <--tulis target di sini-->
                    </td>
                    <td>${units}</td>
                </tr>
            `

            itemNumber++;
        });
    }
}