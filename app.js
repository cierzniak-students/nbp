const pobierzKursy = async () => {
  const response = await fetch('http://api.nbp.pl/api/exchangerates/tables/A/');
  const kursy = await response.json();
  return kursy[0];
};

const wypelnijTabele = (tabelaKursow) => {
  const loc = document.querySelector('tbody');
  loc.innerHTML = '';
  tabelaKursow.forEach((kurs) => {
    loc.innerHTML += `<tr>
        <td>${kurs.currency}</td>
        <td>${kurs.mid}</td>
      </tr>`;
  });
}

const wypelnijDateKursu = (date) => {
  const loc = document.querySelector('span');
  loc.innerText = `Tabela kursów z dnia ${date}`;
}

document.querySelector('#pobierz')
  .addEventListener('click', () => pobierzKursy().then(dane => {
    wypelnijDateKursu(dane.effectiveDate);
    wypelnijTabele(dane.rates);
  }));
