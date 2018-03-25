<ul>
    {{#each favoriteProducts}}
    <li class='favorite-products'>
        <img width='50px' src={{main_url}} >
        <p class='products-names'>{{name}}</p>
        <p class='product-prices'>{{price}} лв.</p>
        <hr/>
    </li>
    {{/each}}
</ul> 