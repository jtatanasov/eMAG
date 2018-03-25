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
                    <tr>
                        <td class='fav-product-img'><a href=''><img class='' src='https://s0emagst.akamaized.net/products/3635/3634374/images/res_d242c1c1a0263be93887c386c8ed148c_150x150_c8nn.jpg' /></a></td>
                        <td class='product-description'><div class='fav-name'><h2><a href=''>Тонколони 2.0 А+ МСлкадф</a></h2></div>
                            <div class='availability'><span >В наличност</span></div>
                            <div class='fav-price'><span>19.00лв</span></div></td>
                        <td><button id='add-fav-to-cart'>Добави в количката</button></td>
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