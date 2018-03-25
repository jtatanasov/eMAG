<div id='user-menu'>
    <div id='profile-options'>
        <ul>
            <li id='option-personal-data'>Лични данни</li>
            <li id='option-my-orders'>Моите поръчки</li>
            <li id='option-my-favs'>Любими продукти</li>
        </ul>
    </div>
    <div id='profile-option-content'>
        <div id='edit-profile'>
            <h3>Моите данни</h3>
            <section>
                <form id='edit-profile'>
                    <div class='labels'>
                        <label for="title">Обръщание</label>
                    </div>
                    <div class='inputs'>
                        <input id='titleMr' type="radio" value='mr' name='title' />
                        <label>Г-н</label>
                        <input id='titleMrs' type="radio" value='mrs' name='title' />
                        <label>Г-жа</label>
                        <input id='titleMiss' type="radio" value='miss' name='title' />
                        <label>Г-жица</label>
                    </div>
                    <div class='labels'>
                        <label for="fullname">Име и фамилия</label>
                    </div>
                    <div class='inputs'>
                        <input id='fullname' type="text" value="{{fullname}}" />
                    </div>

                    <div class='labels'>
                        <label for="mobile-number">Мобилен телефон</label>
                    </div>
                    <div class='inputs'>
                        <input id='mobile-number' type="text" value="{{phoneNumber}}" />
                    </div>


                    <button id='save-profile-edits-btn'>Запази</button>
                </form>
            </section>

            <h3>Адрес</h3>
            <section>
                {{#if address}}
                <p style='display: inline-block' width='60%'>{{ address }}</p>
                <button class='address-buttons' id='delete-address'>изтрий</button>
                <button class='address-buttons' id='edit-address'>редактирай</button>
                {{ else}}
                <p>Не си добавил адрес за доставка. Можеш да го направиш от долния бутон</p>
                <button class='address-buttons' id='add-address'>&CirclePlus; Добави адрес</button>
                {{/if}}
            <div id="myModal" class="modal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h3>Добави адрес за доставка</h3>
                        <div class='labels'>
                            <label for="address-name">Име и фамилия</label>
                        </div>
                        <div class='inputs'>
                            <input id='address-name' type="text" value="{{fullname}}" />
                        </div>

                        <div class='labels'>
                            <label for="address-mobile-number">Мобилен телефон</label>
                        </div>
                        <div class='inputs'>
                            <input id='address-mobile-number' type="text" value="{{phoneNumber}}" />
                        </div>
                        <div class='labels'>
                            <label for="address">Адрес</label>
                        </div>
                        <div class='inputs'>
                            {{#if address}}
                        <input id='address' type="text" value={{ address }} />
                            {{ else}}
                            <input id='address' type="text" value='' />
                            {{/if}}
                    </div>
                        <button id='save-address'>Запази</button>
                    </div>
                </div>
            </section>

            <h3>Промяна на email адрес</h3>
            <section>
                <p id='current-email'>Настоящ email адрес: {{ email }}</p>
                <form>
                    <div class='labels'>
                        <label for='new-email'>Нов email адрес</label>
                    </div>
                    <div class='inputs'>
                        <input type='email' id='new-email' />
                    </div>
                    <div class='labels'>
                        <label for='confirm-new-email'>Потвърди email адрес</label>
                    </div>
                    <div class='inputs'>
                        <input type='email' id='confirm-new-email' />
                    </div>

                    <button id='save-new-email'>Запази</button>
                </form>
            </section>

            <h3>Промяна на парола</h3>
            <section>
                <form>
                    <div class='labels'>
                        <label for='old-password'>Стара парола</label>
                    </div>
                    <div class='inputs'>
                        <input type='password' id='old-password' />
                    </div>
                    <div class='labels'>
                        <label for='new-password'>Нова парола</label>
                    </div>
                    <div class='inputs'>
                        <input type='password' id='new-password' />
                    </div>
                    <div class='labels'>
                        <label for='confirm-new-password'>Потвърди парола</label>
                    </div>
                    <div class='inputs'>
                        <input type='password' id='confirm-new-password' />
                    </div>

                    <button id='save-new-password'>Запази</button>
                </form>
            </section>
        </div>
    </div>
</div>