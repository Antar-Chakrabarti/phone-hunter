// handle click event
document.getElementById('search-btn').addEventListener('click', () => {
    const phnText = document.getElementById('input-txt').value.toLowerCase();
    if (phnText === '') {
        document.getElementById('search-warning').style.display = 'block';
        return '';
    } else {
        document.getElementById('search-warning').style.display = 'none';
    }
    const url = `https://openapi.programming-hero.com/api/phones?search=${phnText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data.slice(0, 20)))
});
// displaying data
const displayPhone = detail => {
    if (detail.length == '') {
        document.getElementById('worn-result').style.display = 'block';
    } else {
        document.getElementById('worn-result').style.display = 'none';
    }
    const parant = document.getElementById('card-section');
    parant.textContent = '';
    for (const details of detail) {
        const div = document.createElement('col');
        div.classList.add('col');
        div.innerHTML = `                
        <div class="col">
          <div class="card">
              <img src="${details.image}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title">${details.phone_name}</h5>
                  <h5>Brand : ${details.brand}</h5>
                 <p class="card-text"></p>
                  <button onclick="showDetails('${details.slug}')" class="btn btn-primary">Show Details</button>
              </div>
          </div>
      </div>
    `
        parant.appendChild(div);
    }
    // console.log(detail)
}

const showDetails = (ProductId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${ProductId}`
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data))
        //console.log(ProductId);
}