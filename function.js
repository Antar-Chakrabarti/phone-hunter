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
        .then(data => displayMobileDetails(data))
        //console.log(ProductId);
}

const displayMobileDetails = data => {
    const parant = document.getElementById('details-section');
    if (data.data.releaseDate == '') {
        parant.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${data.data.image}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">releaseDate: </h5>
            <p class="card-text">No Release date Found</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
        </ul>
    </div>
        `
    } else {
        parant.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${data.data.image}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">releaseDate: </h5>
            <p class="card-text">${data.data.releaseDate}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">An item</li>
            <li class="list-group-item">A second item</li>
            <li class="list-group-item">A third item</li>
        </ul>
    </div>
        `
    }

    //console.log(data.data.mainFeatures)
    console.log(data.data.releaseDate)
}