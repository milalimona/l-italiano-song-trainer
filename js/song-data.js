let lineCounter = 0;
const L = (start, end, it, ru) => ({ id: `line-${++lineCounter}`, start, end, it, ru });
const C = (id, prompt, options, answer, explanation, wrongHint = '', context = '', solution = null) => ({
  id, type: 'choice', prompt, options, answer, explanation, wrongHint, context, solution
});
const O = (id, prompt, options, answer, ru) => ({
  id, type: 'order', prompt, options, answer, explanation: '', solution: { it: answer.join(' '), ru }
});
const S = (it, ru) => ({ it, ru });

export const songData = {
  id: 'l-italiano',
  title: 'L’italiano',
  artist: 'Toto Cutugno',
  youtubeId: 'TYtdYslLY9I',
  playbackSyncOffset: 0.9,
  sections: [
    { id: 'intro', lines: [
      L(0.17, 4.10, 'Lasciatemi cantare', 'Позвольте мне спеть'),
      L(4.10, 7.98, 'con la chitarra in mano', 'с гитарой в руке.'),
      L(7.98, 11.93, 'lasciatemi cantare', 'Позвольте мне спеть,'),
      L(11.93, 16.82, 'sono un italiano', 'я — итальянец.')
    ]},
    { id: 'strofa-1', lines: [
      L(16.82, 20.88, 'Buongiorno Italia, gli spaghetti al dente', 'Доброе утро, Италия, спагетти «аль денте»,'),
      L(20.88, 24.78, 'e un partigiano come Presidente', 'и партизан в президентах,'),
      L(24.78, 27.80, 'con l’autoradio sempre nella mano destra', 'с вечной автомагнитолой в правой руке'),
      L(27.80, 32.71, 'e un canarino sopra la finestra', 'и канарейкой на окне.'),
      L(32.71, 36.86, 'Buongiorno Italia con i tuoi artisti', 'Доброе утро, Италия, с твоими артистами,'),
      L(36.86, 40.63, 'con troppa America sui manifesti', 'с засильем Америки на плакатах,'),
      L(40.63, 43.86, 'con le canzoni, con amore, con il cuore', 'с песнями о любви от всего сердца,'),
      L(43.86, 48.52, 'con più donne, sempre meno suore', 'с женщинами, которые постепенно сбрасывают монашеские покровы.')
    ]},
    { id: 'ponte-1', lines: [
      L(48.52, 50.55, 'Buongiorno Italia', 'Доброе утро, Италия.'),
      L(50.55, 52.65, 'buongiorno Maria', 'Доброе утро, Мария,'),
      L(52.65, 55.95, 'con gli occhi pieni di malinconia', 'с глазами, полными печали.'),
      L(55.95, 59.38, 'buongiorno Dio', 'Доброе утро, Боже,'),
      L(59.38, 63.37, 'lo sai che ci sono anch’io', 'знаешь, ведь я тоже существую.')
    ]},
    { id: 'ritornello-1', lines: [
      L(63.37, 67.37, 'Lasciatemi cantare', 'Позвольте мне спеть'),
      L(67.37, 71.38, 'con la chitarra in mano', 'с гитарой в руке,'),
      L(71.38, 73.86, 'lasciatemi cantare', 'позвольте мне спеть'),
      L(73.86, 79.12, 'una canzone piano piano', 'песню тихо-тихо.'),
      L(79.12, 83.21, 'Lasciatemi cantare', 'Позвольте мне спеть,'),
      L(83.21, 87.25, 'perché ne sono fiero', 'потому что я горд тем,'),
      L(87.25, 91.04, 'sono un italiano', 'что я итальянец,'),
      L(91.04, 96.08, 'un italiano vero', 'настоящий итальянец.')
    ]},
    { id: 'strofa-2', lines: [
      L(96.08, 100.25, 'Buongiorno Italia che non si spaventa', 'Доброе утро, Италия, которую не так легко напугать,'),
      L(100.25, 103.99, 'e con la crema da barba alla menta', 'с ментоловым кремом для бритья,'),
      L(103.99, 107.02, 'con un vestito gessato sul blu', 'с синими костюмами в тонкую белую полоску,'),
      L(107.02, 111.88, 'e la moviola la domenica in TV', 'с футбольными обзорами по воскресеньям по ТВ.'),
      L(111.88, 115.83, 'Buongiorno Italia con caffè ristretto', 'Доброе утро, Италия, с кофе ристретто,'),
      L(115.83, 119.88, 'le calze nuove nel primo cassetto', 'с новыми носками в верхнем ящике комода,'),
      L(119.88, 127.73, 'con la bandiera in tintoria e una 600 giù di carrozzeria', 'с флагом в прачечной и «Фиатом-600» с ржавым кузовом.')
    ]},
    { id: 'ponte-2', lines: [
      L(127.73, 131.67, 'Buongiorno Italia, buongiorno Maria', 'Доброе утро, Италия, доброе утро, Мария,'),
      L(131.67, 135.18, 'con gli occhi pieni di malinconia', 'с глазами, полными печали.'),
      L(135.18, 138.45, 'buongiorno Dio', 'Доброе утро, Боже,'),
      L(138.45, 142.56, 'lo sai che ci sono anch’io', 'знаешь, ведь я тоже существую.')
    ]},
    { id: 'ritornello-2', lines: [
      L(142.56, 146.36, 'Lasciatemi cantare', 'Позвольте мне спеть'),
      L(146.36, 150.45, 'con la chitarra in mano', 'с гитарой в руке.'),
      L(150.45, 152.96, 'lasciatemi cantare', 'Позвольте мне спеть'),
      L(152.96, 158.32, 'una canzone piano piano', 'песню тихо-тихо.'),
      L(158.32, 162.39, 'Lasciatemi cantare', 'Позвольте мне спеть,'),
      L(162.39, 166.33, 'perché ne sono fiero', 'потому что я горд тем,'),
      L(166.33, 170.25, 'sono un italiano', 'что я итальянец,'),
      L(170.25, 174.38, 'un italiano vero', 'настоящий итальянец.')
    ]},
    { id: 'ritornello-3', lines: [
      L(193.74, 197.78, 'Lasciatemi cantare', 'Позвольте мне спеть'),
      L(197.78, 201.73, 'con la chitarra in mano', 'с гитарой в руке.'),
      L(201.73, 204.32, 'lasciatemi cantare', 'Позвольте мне спеть'),
      L(204.32, 209.54, 'una canzone piano piano', 'песню тихо-тихо.'),
      L(209.54, 213.60, 'Lasciatemi cantare', 'Позвольте мне спеть,'),
      L(213.60, 217.68, 'perché ne sono fiero', 'потому что я горд тем,'),
      L(217.68, 223.47, 'sono un italiano', 'что я итальянец,'),
      L(223.47, 226.20, 'un italiano vero', 'настоящий итальянец.')
    ]}
  ],
  history: {
    sentences: [
      {
        it: 'Toto Cutugno è uno dei cantautori italiani più conosciuti nel mondo.',
        ru: 'Тото Кутуньо — один из самых известных в мире итальянских авторов-исполнителей.'
      },
      {
        it: 'Nel 1983 presenta “L’italiano” al Festival di Sanremo.',
        ru: 'В 1983 году он представляет песню «L’italiano» на фестивале в Сан-Ремо.'
      },
      {
        it: 'La canzone arriva quinta, ma il pubblico la accoglie con grande entusiasmo.',
        ru: 'Песня занимает пятое место, но публика принимает её с большим восторгом.'
      },
      {
        it: 'Il testo racconta l’Italia con affetto, orgoglio e un po’ di ironia.',
        ru: 'Текст рассказывает об Италии с теплотой, гордостью и лёгкой иронией.'
      },
      {
        it: 'Mostra piccole abitudini quotidiane e immagini che molti italiani riconoscono.',
        ru: 'Он показывает повседневные привычки и образы, которые узнают многие итальянцы.'
      },
      {
        it: 'Cristiano Minellono trova l’idea dopo aver sentito in televisione le parole “Buongiorno Italia”.',
        ru: 'Кристиано Минеллоно находит идею, услышав по телевидению слова «Доброе утро, Италия».'
      },
      {
        it: 'All’inizio la canzone viene proposta ad Adriano Celentano, ma lui decide di non cantarla.',
        ru: 'Сначала песню предлагают Адриано Челентано, но он решает её не исполнять.'
      },
      {
        it: 'Così Toto Cutugno la porta sul palco con la sua voce calda e diretta.',
        ru: 'Тогда Тото Кутуньо сам исполняет её на сцене своим тёплым и открытым голосом.'
      },
      {
        it: 'Dopo Sanremo, “L’italiano” attraversa le frontiere e diventa famosa in molti paesi.',
        ru: 'После Сан-Ремо песня «L’italiano» пересекает границы и становится известной во многих странах.'
      },
      {
        it: 'Ancora oggi il suo ritornello fa cantare insieme persone di generazioni diverse.',
        ru: 'И сегодня её припев объединяет в пении людей разных поколений.'
      }
    ],
    sources: [
      {
        label: 'Rai News',
        url: 'https://www.rainews.it/video/2023/08/italiano-toto-cutugno-14c2fe66-e042-4889-a1ae-78d02428e601.html'
      },
      {
        label: 'Rai Teche',
        url: 'https://www.teche.rai.it/2023/08/addio-toto-cutugno/'
      },
      {
        label: 'ANSA',
        url: 'https://www.ansa.it/sito/notizie/cultura/musica/2023/08/22/cristiano-minellono-cosi-con-cutugno-nacque-litaliano_39d177f4-be34-4672-8685-6375dd31c73d.html'
      }
    ]
  },
  exerciseSections: [
    { id:'lessico', title:'Лексика', subtitle:'Слова и контекст', recommended:1, exercises:[
      C('l1','Что означает «la malinconia»?',['меланхолия','гордость','смелость','радость'],'меланхолия','Malinconia — меланхолия, тихая грусть.','Это чувство связано с грустью.'),
      C('l2','Что означает «la tintoria»?',['химчистка','парикмахерская','мастерская','книжный магазин'],'химчистка','La tintoria — химчистка.','Туда относят одежду.'),
      C('l3','Что означает «il cassetto»?',['ящик','плакат','подоконник','костюм'],'ящик','Il cassetto — ящик комода или стола.','Это часть мебели.'),
      C('l4','Что означает «il vestito gessato»?',['костюм в полоску','вечернее платье','спортивный костюм','рабочая форма'],'костюм в полоску','Gessato — ткань в тонкую вертикальную полоску.','Вспомните описание одежды.'),
      C('l5','Buongiorno Italia con troppa America sui ___',['manifesti','cassetti','artisti','occhi'],'manifesti','I manifesti — плакаты.','Нужно существительное во множественном числе.', 'Buongiorno Italia con troppa America sui manifesti', S('Buongiorno Italia con troppa America sui manifesti','Доброе утро, Италия, с засильем Америки на плакатах.')),
      C('l6','Le calze nuove nel primo ___',['cassetto','cuore','vestito','canarino'],'cassetto','Il cassetto — ящик.','Это место хранения вещей.', 'Le calze nuove nel primo cassetto', S('Le calze nuove nel primo cassetto','Новые носки в верхнем ящике комода.')),
      C('l7','Что означает «la moviola» в контексте песни?',['повтор спортивного момента','новостной выпуск','музыкальный клип','прогноз погоды'],'повтор спортивного момента','La moviola — замедленный повтор, особенно в футбольном обзоре.','Это телевизионный термин.'),
      C('l8','Con l’autoradio sempre nella mano ___',['destra','vera','nuova','piena'],'destra','La mano destra — правая рука.','Нужна сторона.', 'Con l’autoradio sempre nella mano destra', S('Con l’autoradio sempre nella mano destra','С вечной автомагнитолой в правой руке.'))
    ]},
    { id:'verbi', title:'Глаголы', subtitle:'Формы и значения', recommended:2, exercises:[
      C('v1','Переведите «позвольте мне спеть»',['lasciatemi cantare','fatemi parlare','voglio cantare','posso suonare'],'lasciatemi cantare','Lasciatemi cantare — позвольте мне спеть.','Глагол lasciare здесь в повелительной форме.'),
      C('v2','Какой инфинитив у «si spaventa»?',['spaventarsi','aspettare','sapere','cantare'],'spaventarsi','Spaventarsi — пугаться.','Это возвратный глагол.'),
      C('v3','Buongiorno Italia che non si ___',['spaventa','aspetta','presenta','dimentica'],'spaventa','Non si spaventa — не пугается.','Выберите глагол со значением «пугаться».', '', S('Buongiorno Italia che non si spaventa','Доброе утро, Италия, которую не так легко напугать.')),
      C('v4','«Я знаю» по-итальянски — это…',['so','sai','sa','sono'],'so','So — форма sapere для io.','Нужна форма первого лица.'),
      C('v5','В строке «lo sai» глагол стоит в форме…',['tu','io','lui / lei','voi'],'tu','Sai — форма sapere для tu.','Посмотрите на окончание.'),
      C('v6','Как сказать «я существую / я есть»?',['ci sono','ci sei','ho','sto'],'ci sono','Ci sono — я есть, я присутствую.','Нужна форма essere для io.'),
      C('v7','Переведите «я горжусь этим»',['ne sono fiero','lo so bene','sono italiano','ne ho paura'],'ne sono fiero','Ne sono fiero — я горжусь этим.','Ne заменяет уже названную идею.'),
      C('v8','Lasciatemi ___ una canzone',['cantare','cantate','canto','cantando'],'cantare','После lasciatemi употребляется инфинитив.','После этой конструкции нужна неопределённая форма.', '', S('Lasciatemi cantare una canzone','Позвольте мне спеть песню.')),
      C('v9','Выберите форму для «вы знаете» (voi)',['sapete','sai','sanno','sappiamo'],'sapete','Voi sapete — вы знаете.','Вспомните спряжение sapere.'),
      C('v10','Какой глагол означает «петь»?',['cantare','suonare','ascoltare','parlare'],'cantare','Cantare — петь; suonare — играть на инструменте.','Это действие исполнителя.')
    ]},
    { id:'nomi', title:'Существительные', subtitle:'Артикли и число', recommended:3, exercises:[
      C('n1','Как перевести «la chitarra»?',['гитара','песня','рука','радио'],'гитара','La chitarra — гитара.','Это музыкальный инструмент.'),
      C('n2','Как перевести «il canarino»?',['канарейка','петух','воробей','голубь'],'канарейка','Il canarino — канарейка.','Это певчая птица.'),
      C('n3','Множественное число «la donna» — …',['le donne','i donni','le donna','gli donne'],'le donne','La donna → le donne.','Существительное женского рода на -a.'),
      C('n4','Выберите артикль: ___ autoradio',['l’','la','il','uno'],'l’','Перед гласной определённый артикль усекается: l’autoradio.','Перед гласной артикль обычно усекается.'),
      C('n5','Как перевести «il manifesto»?',['плакат','газета','картина','афиша кинотеатра'],'плакат','Il manifesto — плакат, афиша.','Это печатное изображение большого формата.'),
      C('n6','Какое слово образует пару «глаза — глаз»?',['gli occhi — l’occhio','le occhie — l’occhia','i occhi — il occhio','gli occhii — lo occhio'],'gli occhi — l’occhio','L’occhio → gli occhi.','Это особая форма множественного числа.'),
      C('n7','Выберите артикль: ___ spaghetti',['gli','i','le','lo'],'gli','Перед s + согласная во множественном числе: gli spaghetti.','Вспомните правило для s impura.'),
      C('n8','Что означает «la carrozzeria»?',['кузов автомобиля','автомагнитола','автомастерская','дорога'],'кузов автомобиля','La carrozzeria — кузов; также кузовная мастерская.','В песне речь о состоянии машины.')
    ]},
    { id:'aggettivi', title:'Прилагательные', subtitle:'Формы и согласование', recommended:4, exercises:[
      C('a1','Как перевести «настоящий итальянец»?',['un italiano vero','un italiano nuovo','un vero artista','un uomo fiero'],'un italiano vero','Vero — настоящий, подлинный.','Нужно прилагательное со значением «настоящий».'),
      C('a2','Con gli occhi ___ di malinconia',['pieni','pieno','piene','piena'],'pieni','Occhi — мужской род, множественное число: pieni.','Согласуйте с gli occhi.', '', S('Con gli occhi pieni di malinconia','С глазами, полными печали.')),
      C('a3','Le calze ___',['nuove','nuovi','nuova','nuovo'],'nuove','Calze — женский род, множественное число: nuove.','Согласуйте с le calze.', '', S('Le calze nuove nel primo cassetto','Новые носки в верхнем ящике комода.')),
      C('a4','Как перевести «гордый»?',['fiero','vero','gessato','ristretto'],'fiero','Fiero — гордый.','Это чувство лирического героя.'),
      C('a5','Какое прилагательное означает «полный»?',['pieno','primo','meno','destro'],'pieno','Pieno — полный.','В песне глаза полны меланхолии.'),
      C('a6','Выберите женскую форму «десная»',['destra','destro','destri','destre'],'destra','Mano — женского рода: la mano destra.','Согласуйте с la mano.'),
      C('a7','Как перевести «мятный» в сочетании «crema alla menta»?',['с мятой / ментоловый','сладкий','горький','холодный'],'с мятой / ментоловый','Alla menta — с мятой, мятный.','Это описание крема для бритья.'),
      C('a8','Un vestito ___ sul blu',['gessato','ristretto','pieno','italiano'],'gessato','Gessato — в тонкую полоску.','Это описание рисунка ткани.', '', S('Con un vestito gessato sul blu','С синим костюмом в тонкую белую полоску.'))
    ]},
    { id:'grammatica', title:'Грамматика', subtitle:'Конструкции песни', recommended:5, exercises:[
      C('g1','Почему в «lasciatemi» есть -mi?',['это местоимение «мне / меня»','это окончание будущего времени','это артикль','это частица отрицания'],'это местоимение «мне / меня»','Lasciate + mi → lasciatemi: позвольте мне.','Разберите слово на глагол и местоимение.'),
      C('g2','Выберите верный предлог: ___ la chitarra in mano',['con','per','da','su'],'con','Con — с.','Нужен предлог совместности.', '', S('Con la chitarra in mano','С гитарой в руке.')),
      C('g3','В «ne sono fiero» частица ne заменяет…',['то, чем говорящий гордится','место','человека','время'],'то, чем говорящий гордится','Ne означает «этим / из этого» и отсылает к уже названной мысли.','Она заменяет дополнение с di.'),
      C('g4','Выберите: «и я тоже» — …',['anch’io','anche me','io ancora','pure mi'],'anch’io','Anch’io — я тоже.','Перед io конечная гласная выпадает.'),
      C('g5','Почему «alla menta», а не «a la menta»?',['a + la сливаются','это множественное число','это прошедшее время','la здесь местоимение'],'a + la сливаются','A + la = alla.','Вспомните слитные предлоги.'),
      C('g6','Выберите слитную форму: su + il',['sul','suil','allo','nel'],'sul','Su + il = sul.','Это предлог с артиклем.'),
      C('g7','«Che non si spaventa»: che относится к…',['Italia','Buongiorno','crema','menta'],'Italia','Che вводит определительное придаточное и относится к Italia.','Найдите существительное перед che.'),
      C('g8','Какой порядок естественен?',['lo sai che ci sono anch’io','sai lo che anch’io ci sono','che lo sai sono anch’io','anch’io sai lo ci sono'],'lo sai che ci sono anch’io','Lo sai che… — ты знаешь, что…','Сначала дополнение lo, затем глагол sai.')
    ]},
    { id:'espressioni', title:'Выражения', subtitle:'Живые сочетания', recommended:6, exercises:[
      C('e1','Что значит «al dente»?',['слегка недоваренный, упругий','очень острый','с сыром','холодный'],'слегка недоваренный, упругий','Al dente описывает правильно приготовленную пасту.','Это кулинарное выражение.'),
      C('e2','Что значит «piano piano»?',['потихоньку / тихо-тихо','очень быстро','на пианино','снова и снова'],'потихоньку / тихо-тихо','Piano piano — постепенно или очень тихо.','Повтор усиливает значение.'),
      C('e3','Что значит «in mano»?',['в руке','под рукой','из рук','рука об руку'],'в руке','In mano — в руке.','Это устойчивое сочетание.'),
      C('e4','«Giù di carrozzeria» означает, что машина…',['в плохом состоянии','едет вниз','очень новая','стоит в гараже'],'в плохом состоянии','Giù di carrozzeria — с изношенным, плохим кузовом.','Это разговорное описание состояния.'),
      C('e5','Как сказать «от всего сердца»?',['con il cuore','nel cuore','sul cuore','dal cuore solo'],'con il cuore','Con il cuore — с сердцем, от всего сердца.','В песне это характеристика песен.'),
      C('e6','Что значит «sempre meno»?',['всё меньше','всё больше','иногда','как всегда'],'всё меньше','Sempre meno — всё меньше.','Сравните meno и più.')
    ]},
    { id:'ordine', title:'Собери строку', subtitle:'Порядок слов', recommended:7, exercises:[
      O('o1','Соберите строку',['Lasciatemi','cantare','con','la chitarra','in mano'],['Lasciatemi','cantare','con','la chitarra','in mano'],'Позвольте мне спеть с гитарой в руке.'),
      O('o2','Соберите строку',['con','gli occhi','pieni','di malinconia'],['con','gli occhi','pieni','di malinconia'],'с глазами, полными печали.'),
      O('o3','Соберите строку',['lo sai','che','ci sono','anch’io'],['lo sai','che','ci sono','anch’io'],'знаешь, ведь я тоже существую.'),
      O('o4','Соберите строку',['una canzone','piano','piano'],['una canzone','piano','piano'],'песню тихо-тихо.'),
      O('o5','Соберите строку',['perché','ne sono','fiero'],['perché','ne sono','fiero'],'потому что я горд тем.'),
      O('o6','Соберите строку',['le calze','nuove','nel primo','cassetto'],['le calze','nuove','nel primo','cassetto'],'новые носки в верхнем ящике комода.')
    ]},
    { id:'quiz', title:'Итоговый квиз', subtitle:'Проверка всего урока', recommended:8, exercises:[
      C('q1','Как сказать «настоящий итальянец»?',['un italiano vero','un artista vero','un italiano fiero','uno italiano vero'],'un italiano vero','Un italiano vero — настоящий итальянец.','Обратите внимание на артикль и прилагательное.'),
      C('q2','Gli occhi ___ di malinconia',['pieni','piene','pieno','piena'],'pieni','С gli occhi согласуется форма pieni.','Согласуйте прилагательное, не восстанавливая всю строку.', '', S('Gli occhi pieni di malinconia','Глаза, полные печали.')),
      C('q3','Что означает «tintoria»?',['химчистка','типография','кондитерская','автомастерская'],'химчистка','La tintoria — химчистка.','Туда можно отнести одежду или флаг.'),
      C('q4','Buongiorno Italia che non si ___',['spaventa','presenta','lamenta','addormenta'],'spaventa','Si spaventa — пугается.','Нужен возвратный глагол со значением «пугаться».', '', S('Buongiorno Italia che non si spaventa','Доброе утро, Италия, которую не так легко напугать.')),
      C('q5','Выберите артикль: ___ occhi',['gli','i','le','l’'],'gli','Перед гласной во множественном числе употребляется gli.','Вспомните форму артикля перед гласной.'),
      C('q6','A + la = …',['alla','ala','alla la','al'],'alla','Предлог a с артиклем la образует alla.','Нужен слитный предлог.'),
      C('q7','Что означает «ne sono fiero»?',['я горжусь этим','я знаю это','я боюсь этого','я вспоминаю об этом'],'я горжусь этим','Ne sono fiero — я горжусь этим.','Fiero описывает гордость.'),
      C('q8','Какой перевод у «sempre meno suore»?',['всё меньше монахинь','всегда больше сестёр','меньше женщин','всегда одни женщины'],'всё меньше монахинь','Sempre meno — всё меньше; suore — монахини.','Разберите выражение по частям.'),
      C('q9','Lasciatemi ___',['cantare','canto','cantate','cantando'],'cantare','После lasciatemi требуется инфинитив.','Нужна неопределённая форма.', '', S('Lasciatemi cantare','Позвольте мне спеть.')),
      C('q10','Как переводится «anch’io»?',['я тоже','только я','ещё один','я снова'],'я тоже','Anch’io — я тоже.','Это anche + io.')
    ]}
  ]
};
