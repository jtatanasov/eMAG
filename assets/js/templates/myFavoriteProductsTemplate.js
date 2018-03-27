<div id='user-menu'>
    <div id='profile-options'>
        <ul>
            <li id='option-personal-data'>Лични данни</li>
            <li id='option-my-orders'>Моите поръчки</li>
            <li id='option-my-favs'>Любими продукти</li>
            <li id='option-my-cart'>Моята количка</li>
        </ul>
    </div>
    <div id='profile-option-content'>
        <div id='my-fav-products'>
            <h3>Моите любими продукти</h3>
            <section>
                {{#if favoriteProducts}}
                <div id='menu-favs'>
                    <button id='add-all-to-cart'><img width='15px' class='icons' src='assets/images/icons/cart-icon.png' />Добави всички в количката</button>
                    <button id='delete-all-favs'>Изтрий всички</button>
                </div>

                <table id='favs'>
                    {{#each favoriteProducts}}
                    <tr fav-product-id={{id}}>
                        <td class='fav-product-img'><a href=''><img class='' src={{ main_url }} /></a></td>
                        <td class='product-description'><div class='fav-name'><h2><a href=''>{{ name }}</a></h2></div>
                            {{#if availability}}
                            <div class='availability'><span >В наличност</span></div>
                            {{ else}}
                            <div class='availability'><span >Не е в наличност</span></div>
                            {{/if}}
                            <div class='fav-price'><span>{{ price }} лв.</span></div></td>
                        <td class='buttons-curr-fav-product'>
                        <button class='add-curr-fav-to-cart'><img width='15px' class='icons' src='assets/images/icons/cart-icon.png' />Добави в количката</button>
                            <button class='delete-curr-fav'>Изтрий</button>
                        </td>
                    </tr>
                    {{/ each}}
                    {{ else}}
                    <div id='no-fav-products'>Нямате добавени любими продукти</div>
                    {{/if}}
                </table>
            </section>
        </div>
    </div>
</div>