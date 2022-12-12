const pobierzKursy = async () => {
  const response = await fetch('http://api.nbp.pl/api/exchangerates/tables/A/');
  const kursy = await response.json();
  return kursy[0];
};

const wypelnijTabele = (tabelaKursow, isLoading = false) => {
  const loc = document.querySelector('tbody');
  loc.innerHTML = '';
  if (isLoading) {
    loc.innerHTML += `<tr><td colspan='2'>Trwa ładowanie</td></tr>`;
    return;
  }
  tabelaKursow.forEach((kurs) => {
    loc.innerHTML += `<tr>
        <td>${kurs.currency}</td>
        <td>${kurs.mid}</td>
      </tr>`;
  });
};

const wypelnijDateKursu = (date) => {
  const loc = document.querySelector('span');
  loc.innerText = `Tabela kursów z dnia ${date}`;
};

document.querySelector('#pobierz')
  .addEventListener('click', () => {
    wypelnijTabele([], true);
    pobierzKursy().then(dane => {
      wypelnijDateKursu(dane.effectiveDate);
      wypelnijTabele(dane.rates);
    })
  });
