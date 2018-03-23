<ul>
    {{#each products}}
    <li class='favorite-products'>
        <img width='50px' src={{photo}}/>
        <p class='products-names'>{{name}}</p>
        <p class='product-prices'>{{price}} лв.</p>
        <hr/>
    </li>
    {{/each}}
</ul>