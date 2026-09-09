    function store() {
      const img = (path) => `https://carata.ru${path}`;
      const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

      const deriveSeries = (p) => {
        const n = p.name;
        if (p.brand === 'AUX') {
          if (n.includes('/FJ-')) return 'AUX Classic';
          if (n.includes('/CB-')) return 'Comfort Bit';
          return 'AUX Standard';
        }
        if (p.brand === 'Ecoclima') {
          if (n.includes('07QCW')) return 'QC Wi-Fi';
          if (n.includes('HE')) return 'HE Series';
          if (n.includes('CH')) return 'Comfort Home';
          if (n.includes('TC')) return 'Turbo Cool';
          if (n.includes('AX')) return 'AX Inverter';
          return 'Inverter Pro';
        }
        if (p.brand === 'Gree') return 'Pular Inverter';
        if (p.brand === 'Electrolux') return 'Air Stream';
        if (p.brand === 'Rovex') {
          if (n.includes('Megapolis')) return 'Megapolis';
          if (n.includes('Rich')) return 'Rich';
          return 'STAR';
        }
        if (p.brand === 'Thaicon') return 'TL-RWB';
        return 'Standard';
      };

      const defaultWifi = (p) => {
        if (p.name.includes('QCW') || p.name.includes('PULAR')) return 'Встроенный';
        if (p.inverter && p.price >= 32000) return 'Поддерживается';
        return 'Нет';
      };

      const defaultCountry = (brand) => ({ Thaicon: 'Таиланд' }[brand] || 'Китай');
      const typeSlugs = ['nastennye', 'multisplit', 'mobilnye', 'kassetnye', 'kanalnye', 'kolonnye', 'heatpump', 'vrf'];
      const CART_KEY = 'aeroclim-cart';

      const enrich = (p) => ({
        ...p,
        series: p.series || deriveSeries(p),
        wifi: p.wifi || defaultWifi(p),
        country: p.country || defaultCountry(p.brand),
        type: p.type || typeSlugs[(p.id - 1) % typeSlugs.length],
      });

      return {
        cartOpen: false,
        quickView: null,
        mobileNav: false,
        checkoutStep: 1,
        checkoutDone: false,
        toast: '',
        pageType: '',
        pageProductId: 0,
        deliveryFee: 1000,
        filterBrand: '',
        filterSeries: '',
        filterModel: '',
        filterArea: '',
        filterInverter: '',
        filterColor: '',
        filterEnergy: '',
        filterWifi: '',
        filterCountry: '',
        activeQuick: 'all',
        heroTip: '',
        heroTipX: 0,
        heroTipY: 0,
        heroTipAbove: false,
        filtersOpen: false,
        modelListExpanded: false,
        modelTagsLimit: 6,
        order: { name: '', phone: '', address: '', install: true },
        cart: [],

        quickFilters: [
          { id: 'all', label: 'Все', brand: '', area: '', inverter: '', tip: 'Все модели каталога без ограничений по типу компрессора и площади.' },
          { id: 'inv', label: 'С инвертором', brand: '', area: '', inverter: 'yes', tip: 'Инвертор плавно регулирует мощность — тише работает, меньше расходует электричество и точнее держит температуру.' },
          { id: 'onoff', label: 'Без инвертора', brand: '', area: '', inverter: 'no', tip: 'Классический on/off: включается на полную мощность. Проще и доступнее — подходит для редкого использования.' },
          { id: 'a23', label: 'До 23 м²', brand: '', area: 23, inverter: '', tip: 'Спальня, детская или небольшой кабинет до ~23 м² при высоте потолков до 2,7 м.' },
          { id: 'a27', label: 'До 27 м²', brand: '', area: 27, inverter: '', tip: 'Средняя комната, гостиная-студия или кухня-гостиная до ~27 м².' },
          { id: 'a36', label: 'До 36 м²', brand: '', area: 36, inverter: '', tip: 'Просторная гостиная, зал или open space до ~36 м² — нужна более мощная сплит-система.' },
        ],

        categories: [
          { slug: 'nastennye', title: 'Настенные', img: 'assets/categories/cat-nastennye.png', lead: 'Самый частый выбор для квартир и кабинетов.', text: 'Настенная сплит-система — внутренний блок на стене и наружный за окном. Подходит для одной комнаты: спальни, гостиной или кабинета. Монтаж за несколько часов, тихая работа и точное поддержание температуры.' },
          { slug: 'multisplit', title: 'Мульти-сплит', img: 'assets/categories/cat-multisplit.png', lead: 'Несколько комнат — один наружный блок.', text: 'Мульти-сплит связывает 2–5 внутренних блоков с одним наружным. Экономит место на фасаде и даёт независимый климат в каждой комнате. Удобно для квартир и небольших офисов.' },
          { slug: 'mobilnye', title: 'Мобильные', img: 'assets/categories/cat-mobilnye.png', lead: 'Без капитального монтажа — включил и пользуешься.', text: 'Мобильный кондиционер на колёсах: достаточно вывести гофру в окно. Подходит для съёмного жилья, дачи и временных задач. Не нужен сверление стен и бригада монтажников.' },
          { slug: 'kassetnye', title: 'Кассетные', img: 'assets/categories/cat-kassetnye.png', lead: 'Потолочный блок для офисов и залов.', text: 'Кассетный внутренний блок встраивается в подвесной потолок и равномерно раздаёт воздух на 4 стороны. Решение для open space, магазинов и переговорных с высокими потолками.' },
          { slug: 'kanalnye', title: 'Канальные', img: 'assets/categories/cat-kanalnye.png', lead: 'Климат незаметно — техника спрятана за потолком.', text: 'Канальная система разводит воздух по воздуховодам к решёткам. Видны только аккуратные диффузоры. Для квартир с дизайн-проектом и помещений, где блок на стене нежелателен.' },
          { slug: 'kolonnye', title: 'Колонные', img: 'assets/categories/cat-kolonnye.png', lead: 'Напольная колонна для больших помещений.', text: 'Колонный кондиционер стоит на полу и даёт большой объём воздуха. Используется в залах, ресторанах, холлах и студиях, где нужна мощность без потолочного монтажа.' },
          { slug: 'heatpump', title: 'Тепловые насосы', img: 'assets/categories/cat-teplovye-nasosy.png', lead: 'Охлаждение летом и обогрев зимой.', text: 'Тепловой насос «воздух–воздух» греет дом даже в холодный сезон и охлаждает летом. Энергоэффективная альтернатива отдельному отоплению для загородных домов и квартир.' },
          { slug: 'vrf', title: 'VRF-системы', img: 'assets/categories/cat-vrf.png', lead: 'Мультизональный климат для зданий.', text: 'VRF обслуживает десятки помещений с индивидуальной температурой в каждой зоне. Для офисных центров, коттеджей и коммерции, где одной сплит-системы недостаточно.' },
        ],

        allBrands: [
          'Ecoclima', 'AUX', 'Casarte', 'Ballu', 'Gree', 'Haier', 'LG', 'Samsung',
          'Mitsubishi Electric', 'Panasonic', 'Toshiba', 'Electrolux',
          'Royal Clima', 'Dahatsu', 'Hisense', 'Funai',
        ],

        products: [
          {
            id: 1, brand: 'Ecoclima', name: 'Ecoclima ECW-HE07/BB-4R2',
            price: 19900, area: 20, inverter: false, cooling: '2.1 кВт', heat: '2.2 кВт',
            noise: '22 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/ed0/pqdhwfq9cu9mgak9aejkgsxtecqmafpj/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_he07_bb_4r2_20m.jpg'),
          },
          {
            id: 2, brand: 'Ecoclima', name: 'Ecoclima ECW-CH09/AA-4R1',
            price: 19900, area: 25, inverter: false, cooling: '2.5 кВт', heat: '2.8 кВт',
            noise: '21 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/de3/ud7xx4j0en2mkx6fuymu3t7s3jjpp5b7/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_ch07_aa_4r1_white_20m.jpg'),
          },
          {
            id: 3, brand: 'Ecoclima', name: 'Ecoclima ECW-HE09/BB-4R2',
            price: 22100, area: 25, inverter: false, cooling: '2.5 кВт', heat: '2.8 кВт',
            noise: '21 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/ed0/pqdhwfq9cu9mgak9aejkgsxtecqmafpj/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_he07_bb_4r2_20m.jpg'),
          },
          {
            id: 4, brand: 'Ecoclima', name: 'Ecoclima ECW/I-AX07/FB-4R1',
            price: 23900, area: 20, inverter: true, cooling: '2.1 кВт', heat: '2.2 кВт',
            noise: '22 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/86a/kvjca0oa7mjtwvxv9hbeuvb1xildyiuv/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_ax07_fb_4r1_20m.jpg'),
          },
          {
            id: 5, brand: 'Ecoclima', name: 'Ecoclima ECW/I-CH07/AA-4R1 (White)',
            price: 23900, area: 20, inverter: true, cooling: '2.1 кВт', heat: '2.2 кВт',
            noise: '22 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/de3/ud7xx4j0en2mkx6fuymu3t7s3jjpp5b7/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_ch07_aa_4r1_white_20m.jpg'),
          },
          {
            id: 6, brand: 'Ecoclima', name: 'Ecoclima ECW/I-07QCW',
            price: 24700, area: 20, inverter: true, cooling: '2.1 кВт', heat: '2.2 кВт',
            noise: '22 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/384/eyv0yi5u67zw94qzyo0ksh621fpwiwhc/267_267_1/nastennyy_vnutrenniy_blok_multi_split_sistemy_ecoclima_cmwm_h09_4r2_white_25m.jpg'),
          },
          {
            id: 7, brand: 'Ecoclima', name: 'Ecoclima ECW-CH12/AA-4R1',
            price: 27700, area: 35, inverter: false, cooling: '3.5 кВт', heat: '3.8 кВт',
            noise: '23 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/de3/ud7xx4j0en2mkx6fuymu3t7s3jjpp5b7/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_ch07_aa_4r1_white_20m.jpg'),
          },
          {
            id: 8, brand: 'Ecoclima', name: 'Ecoclima ECW/I-HE07/AA-4R2',
            price: 27900, area: 20, inverter: true, cooling: '2.1 кВт', heat: '2.2 кВт',
            noise: '22 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/4ec/drqt92l7b822qjlokfouzq9i5ohmpq0i/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_he07_aa_4r2_20m.jpg'),
          },
          {
            id: 9, brand: 'Ecoclima', name: 'Ecoclima ECW/I-CH09/AA-4R1 (White)',
            price: 27900, area: 25, inverter: true, cooling: '2.5 кВт', heat: '2.8 кВт',
            noise: '21 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/de3/ud7xx4j0en2mkx6fuymu3t7s3jjpp5b7/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_ch07_aa_4r1_white_20m.jpg'),
          },
          {
            id: 10, brand: 'Ecoclima', name: 'Ecoclima ECW-TC09/AA-4R1',
            price: 22400, area: 25, inverter: false, cooling: '2.5 кВт', heat: '2.8 кВт',
            noise: '21 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/b72/09xnrt96it4t8wo5it3m1mortsn4nv5d/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_tc09_aa_4r2_25m.jpg'),
          },
          {
            id: 11, brand: 'Ecoclima', name: 'Ecoclima ECW-HE12/AA-4R2',
            price: 28200, area: 35, inverter: false, cooling: '3.5 кВт', heat: '3.8 кВт',
            noise: '23 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/4ec/drqt92l7b822qjlokfouzq9i5ohmpq0i/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_he07_aa_4r2_20m.jpg'),
          },
          {
            id: 12, brand: 'Ecoclima', name: 'Ecoclima ECW/I-HE07/BB-4R2',
            price: 28700, area: 20, inverter: true, cooling: '2.1 кВт', heat: '2.2 кВт',
            noise: '22 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/ed0/pqdhwfq9cu9mgak9aejkgsxtecqmafpj/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_he07_bb_4r2_20m.jpg'),
          },
          {
            id: 13, brand: 'Ecoclima', name: 'Ecoclima ECW/I-AX12/FB-4R1',
            price: 29400, area: 35, inverter: true, cooling: '3.5 кВт', heat: '3.8 кВт',
            noise: '23 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/86a/kvjca0oa7mjtwvxv9hbeuvb1xildyiuv/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_ax07_fb_4r1_20m.jpg'),
          },
          {
            id: 14, brand: 'Ecoclima', name: 'Ecoclima ECW-TC12/AA-4R1',
            price: 30900, area: 35, inverter: false, cooling: '3.5 кВт', heat: '3.8 кВт',
            noise: '23 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/b72/09xnrt96it4t8wo5it3m1mortsn4nv5d/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_tc09_aa_4r2_25m.jpg'),
          },
          {
            id: 15, brand: 'Ecoclima', name: 'Ecoclima ECW-HE12/BB-4R2',
            price: 30900, area: 35, inverter: false, cooling: '3.5 кВт', heat: '3.8 кВт',
            noise: '23 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/ed0/pqdhwfq9cu9mgak9aejkgsxtecqmafpj/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_he07_bb_4r2_20m.jpg'),
          },
          {
            id: 16, brand: 'Electrolux', name: 'Electrolux EACS-07HP/N3_23Y_in',
            price: 29549, area: 20, inverter: false, cooling: '2.1 кВт', heat: '2.2 кВт',
            noise: '22 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/bc3/0f6z80a9ca8qf46fkqm5ou6clrc6w20v/267_267_1/nastennyy_konditsioner_electrolux_eacs_07hp_n3_23y_in_20m.jpg'),
          },
          {
            id: 17, brand: 'Ecoclima', name: 'Ecoclima ECW/I-HE09/BB-4R2',
            price: 31700, area: 25, inverter: true, cooling: '2.5 кВт', heat: '2.8 кВт',
            noise: '21 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/ed0/pqdhwfq9cu9mgak9aejkgsxtecqmafpj/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_he07_bb_4r2_20m.jpg'),
          },
          {
            id: 18, brand: 'Ecoclima', name: 'Ecoclima ECW/I-CH12/AA-4R1 (White)',
            price: 32900, area: 35, inverter: true, cooling: '3.5 кВт', heat: '3.8 кВт',
            noise: '23 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/de3/ud7xx4j0en2mkx6fuymu3t7s3jjpp5b7/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_ch07_aa_4r1_white_20m.jpg'),
          },
          {
            id: 19, brand: 'Electrolux', name: 'Electrolux EACS-09HP/N3_23Y_in',
            price: 31989, area: 25, inverter: false, cooling: '2.5 кВт', heat: '2.8 кВт',
            noise: '21 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/bc3/0f6z80a9ca8qf46fkqm5ou6clrc6w20v/267_267_1/nastennyy_konditsioner_electrolux_eacs_07hp_n3_23y_in_20m.jpg'),
          },
          {
            id: 20, brand: 'AUX', name: 'AUX ASW-H09A4/FJ-BR1',
            price: 27600, area: 25, inverter: false, cooling: '2.5 кВт', heat: '2.8 кВт',
            noise: '21 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/79e/34ykp22pp29amllqa6s1os7bzh9vfzp6/267_267_1/nastennyy_konditsioner_aux_asw_h07b4_fj_br1_20m.jpg'),
          },
          {
            id: 21, brand: 'Ecoclima', name: 'Ecoclima ECW/I-TC09/AA-4R2',
            price: 34900, area: 25, inverter: true, cooling: '2.5 кВт', heat: '2.8 кВт',
            noise: '21 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/b72/09xnrt96it4t8wo5it3m1mortsn4nv5d/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_tc09_aa_4r2_25m.jpg'),
          },
          {
            id: 22, brand: 'AUX', name: 'AUX ASW-H07A4/CB-R2DI',
            price: 29900, area: 20, inverter: true, cooling: '2.1 кВт', heat: '2.2 кВт',
            noise: '22 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/1e9/wh8bk9nlh2ckdbh80onnayowna2sqqhc/267_267_1/nastennyy_konditsioner_aux_asw_h07a4_cb_r2di_20m.jpg'),
          },
          {
            id: 23, brand: 'Ecoclima', name: 'Ecoclima ECW/I-HE12/BB-4R2',
            price: 36900, area: 35, inverter: true, cooling: '3.5 кВт', heat: '3.8 кВт',
            noise: '23 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/ed0/pqdhwfq9cu9mgak9aejkgsxtecqmafpj/267_267_1/nastennyy_konditsioner_ecoclima_ecw_i_he07_bb_4r2_20m.jpg'),
          },
          {
            id: 24, brand: 'AUX', name: 'AUX ASW-H09A4/CB-R2DI',
            price: 31900, area: 25, inverter: true, cooling: '2.5 кВт', heat: '2.8 кВт',
            noise: '21 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/1e9/wh8bk9nlh2ckdbh80onnayowna2sqqhc/267_267_1/nastennyy_konditsioner_aux_asw_h07a4_cb_r2di_20m.jpg'),
          },
          {
            id: 25, brand: 'Gree', name: 'Gree PULAR Inverter Eco GWH07AGAXA-K6DNA4E',
            price: 60000, area: 20, inverter: true, cooling: '2.1 кВт', heat: '2.2 кВт',
            noise: '22 дБ', energy: 'A++', refrigerant: 'R32', color: 'Графит',
            img: img('/upload/resize_cache/iblock/a13/bj46es0n4q8ldaduo0jnr8xe2ax5njg1/267_267_1/nastennaya_split_sistema_gree_pular_inverter_matte_gwh09agaxa_k6dna1d.jpeg'),
          },
          {
            id: 26, brand: 'Thaicon', name: 'Thaicon TL-RWB20-VR / TL-ROB20-VR',
            price: 32500, area: 36, inverter: true, cooling: '3.5 кВт', heat: '3.8 кВт',
            noise: '22 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/0a6/vby4q701vccf9zcr24d17ehd7dxjle6v/267_267_1/thaicon_tl_rwb100_na_tl_rob100_na.jpg'),
          },
          {
            id: 27, brand: 'Rovex', name: 'Rovex RS-07CBS4 Megapolis',
            price: 22900, area: 20, inverter: false, cooling: '2.1 кВт', heat: '2.2 кВт',
            noise: '22 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/d15/p0nsvp9hmbyfnpje5o2jq3vd8tnmcg7t/267_267_1/rovex_rs_07cbs4_megapolis.jpg'),
          },
          {
            id: 28, brand: 'Rovex', name: 'Rovex RS-07MUIN1 Rich',
            price: 27900, area: 20, inverter: true, cooling: '2.1 кВт', heat: '2.2 кВт',
            noise: '22 дБ', energy: 'A++', refrigerant: 'R32', color: 'Белый',
            img: img('/upload/resize_cache/iblock/13e/9zpcha149br1hr1k655xadmsqhn77biz/267_267_1/rovex_rs_07muin1_rich.jpg'),
          },
          {
            id: 29, brand: 'Rovex', name: 'Rovex ABS-07HE STAR N',
            price: 22900, area: 20, inverter: false, cooling: '2.1 кВт', heat: '2.2 кВт',
            noise: '22 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/463/1a16kresu9dwkfz6jcqs7jjj2iondak6/267_267_1/rovex_ast_09he_mira_n.jpg'),
          },
          {
            id: 30, brand: 'Rovex', name: 'Rovex ABS-07HE STAR S',
            price: 23900, area: 20, inverter: false, cooling: '2.1 кВт', heat: '2.2 кВт',
            noise: '22 дБ', energy: 'A', refrigerant: 'R410A', color: 'Белый',
            img: img('/upload/resize_cache/iblock/463/1a16kresu9dwkfz6jcqs7jjj2iondak6/267_267_1/rovex_ast_09he_mira_n.jpg'),
          },
        ].map(enrich),

        get activeFilterCount() {
          let n = 0;
          if (this.filterBrand) n++;
          if (this.filterSeries) n++;
          if (this.filterModel) n++;
          if (this.filterArea) n++;
          if (this.filterInverter) n++;
          if (this.filterColor) n++;
          if (this.filterEnergy) n++;
          if (this.filterWifi) n++;
          if (this.filterCountry) n++;
          return n;
        },
        get brands() {
          return [...new Set(this.products.map((p) => p.brand))];
        },
        get brandSeries() {
          if (!this.filterBrand) return [];
          return [...new Set(this.products.filter((p) => p.brand === this.filterBrand).map((p) => p.series))].sort();
        },
        get brandModels() {
          if (!this.filterBrand) return [];
          let list = this.products.filter((p) => p.brand === this.filterBrand);
          if (this.filterSeries) list = list.filter((p) => p.series === this.filterSeries);
          return [...new Set(list.map((p) => p.name))];
        },
        get visibleBrandModels() {
          const all = this.brandModels;
          if (this.modelListExpanded || all.length <= this.modelTagsLimit) return all;
          const visible = all.slice(0, this.modelTagsLimit);
          if (this.filterModel && !visible.includes(this.filterModel)) {
            return [...visible, this.filterModel];
          }
          return visible;
        },
        get areas() {
          return [23, 27, 36];
        },
        get colors() {
          return [...new Set(this.products.map((p) => p.color))].sort();
        },
        get energyClasses() {
          return [...new Set(this.products.map((p) => p.energy))].sort((a, b) => b.length - a.length);
        },
        get wifiOptions() {
          return ['Встроенный', 'Поддерживается', 'Нет'];
        },
        get countries() {
          return [...new Set(this.products.map((p) => p.country))].sort();
        },
        get filteredProducts() {
          return this.products.filter((p) => {
            if (this.filterBrand && p.brand !== this.filterBrand) return false;
            if (this.filterSeries && p.series !== this.filterSeries) return false;
            if (this.filterModel && p.name !== this.filterModel) return false;
            if (this.filterArea && p.area > Number(this.filterArea)) return false;
            if (this.filterInverter === 'yes' && !p.inverter) return false;
            if (this.filterInverter === 'no' && p.inverter) return false;
            if (this.filterColor && p.color !== this.filterColor) return false;
            if (this.filterEnergy && p.energy !== this.filterEnergy) return false;
            if (this.filterWifi && p.wifi !== this.filterWifi) return false;
            if (this.filterCountry && p.country !== this.filterCountry) return false;
            return true;
          });
        },
        get cartCount() {
          return this.cart.reduce((s, i) => s + i.qty, 0);
        },
        get cartTotal() {
          return this.cart.reduce((s, i) => s + i.price * i.qty, 0);
        },
        get orderTotal() {
          return this.cartTotal + (this.cart.length ? this.deliveryFee : 0);
        },
        get currentCategory() {
          return this.categories.find((c) => c.slug === this.pageType) || this.categories[0];
        },
        get currentProduct() {
          return this.products.find((p) => p.id === this.pageProductId) || this.products[0];
        },
        get productCategory() {
          return this.categories.find((c) => c.slug === this.currentProduct.type) || this.categories[0];
        },
        get categoryProducts() {
          const slug = this.currentCategory?.slug;
          return this.products.filter((p) => p.type === slug);
        },
        get relatedProducts() {
          const p = this.currentProduct;
          return this.products.filter((x) => x.id !== p.id && x.type === p.type).slice(0, 3);
        },

        init() {
          const q = new URLSearchParams(location.search);
          this.pageType = q.get('type') || '';
          this.pageProductId = Number(q.get('id') || 0);
          this.loadCart();
          this.$watch('cart', () => this.persistCart());
        },
        loadCart() {
          try {
            const raw = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
            this.cart = raw.map(({ id, qty }) => {
              const p = this.products.find((x) => x.id === id);
              return p ? { ...p, qty } : null;
            }).filter(Boolean);
          } catch {
            this.cart = [];
          }
        },
        persistCart() {
          localStorage.setItem(CART_KEY, JSON.stringify(this.cart.map((i) => ({ id: i.id, qty: i.qty }))));
        },
        categoryHref(c) {
          return 'category.html?type=' + c.slug;
        },
        productHref(p) {
          return 'product.html?id=' + p.id;
        },
        typeTitle(slug) {
          return this.categories.find((c) => c.slug === slug)?.title || 'Сплит-система';
        },

        formatPrice(n) {
          return new Intl.NumberFormat('ru-RU').format(n) + ' ₽';
        },
        specsOf(p) {
          return [
            ['Производитель', p.brand],
            ['Серия', p.series],
            ['Тип', this.typeTitle(p.type)],
            ['Площадь', 'до ' + p.area + ' м²'],
            ['Компрессор', p.inverter ? 'Инверторный' : 'Обычный on/off'],
            ['Охлаждение', p.cooling],
            ['Обогрев', p.heat],
            ['Шум внутр. блока', p.noise],
            ['Класс энергии', p.energy],
            ['Wi‑Fi', p.wifi],
            ['Страна сборки', p.country],
            ['Хладагент', p.refrigerant],
            ['Цвет', p.color],
          ];
        },
        openQuick(p) {
          this.quickView = p;
        },
        closeQuick() {
          this.quickView = null;
        },
        setBrand(b) {
          this.filterBrand = b;
          this.filterSeries = '';
          this.filterModel = '';
          this.modelListExpanded = false;
        },
        showHeroTip(e, tip) {
          const r = e.currentTarget.getBoundingClientRect();
          this.heroTip = tip;
          this.heroTipX = r.left + r.width / 2;
          const below = r.bottom + 10;
          if (below + 96 > window.innerHeight - 8) {
            this.heroTipY = r.top - 10;
            this.heroTipAbove = true;
          } else {
            this.heroTipY = below;
            this.heroTipAbove = false;
          }
        },
        hideHeroTip() {
          this.heroTip = '';
          this.heroTipAbove = false;
        },
        applyQuick(chip) {
          this.hideHeroTip();
          this.activeQuick = chip.id;
          this.filterBrand = chip.brand;
          this.filterSeries = '';
          this.filterModel = '';
          this.filterArea = chip.area || '';
          this.filterInverter = chip.inverter;
          document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
        },
        resetFilters() {
          this.filterBrand = '';
          this.filterSeries = '';
          this.filterModel = '';
          this.filterArea = '';
          this.filterInverter = '';
          this.filterColor = '';
          this.filterEnergy = '';
          this.filterWifi = '';
          this.filterCountry = '';
          this.activeQuick = 'all';
          this.modelListExpanded = false;
        },
        addToCart(p) {
          const existing = this.cart.find((i) => i.id === p.id);
          if (existing) existing.qty += 1;
          else this.cart.push({ ...p, qty: 1 });
          this.persistCart();
          this.showToast('Товар добавлен в корзину');
        },
        changeQty(id, delta) {
          const item = this.cart.find((i) => i.id === id);
          if (!item) return;
          item.qty += delta;
          if (item.qty <= 0) this.removeFromCart(id);
          else this.persistCart();
        },
        removeFromCart(id) {
          this.cart = this.cart.filter((i) => i.id !== id);
          this.persistCart();
        },
        submitOrder() {
          this.checkoutStep = 3;
          this.checkoutDone = true;
          this.cart = [];
          this.persistCart();
        },
        finishOrder() {
          this.checkoutStep = 1;
          this.checkoutDone = false;
          this.cartOpen = false;
          this.order = { name: '', phone: '', address: '', install: true };
          location.href = 'index.html';
        },
        showToast(msg) {
          this.toast = msg;
          clearTimeout(this._toastTimer);
          this._toastTimer = setTimeout(() => { this.toast = ''; }, 3000);
        },
      };
    }
