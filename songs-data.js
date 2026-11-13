/* SCOTTINATOR CATALOG — ADD SONGS AND CLUES HERE.
 * Distinct officially released Strokes song titles, checked through 2026-11-11.
 * Alternate takes, live versions and remixes share the original song's choice.
 * Separately titled releases (Fast Animals, I'll Try Anything Once) are separate.
 * Classic script: works offline when index.html is opened directly.
 */
(function (root) {
  'use strict';

  // Each row stores clue facts and evidence. null means NOT VERIFIED, never No.
  // Album positions use full album order, not vinyl sides. Both regional Is This It
  // track 9 songs are included. Fast Animals is grouped with B-sides/bonus tracks.
  const songs = [
    {"id":"is-this-it","title":"Is This It","album":"Is This It","group":"Is This It","release":"Is This It","year":2001,"track":1,"albumTracks":11,"seconds":151,"source":"https://en.wikipedia.org/wiki/Is_This_It#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-is-this-it-2001"},
    {"id":"the-modern-age","title":"The Modern Age","album":"Is This It","group":"Is This It","release":"Is This It","year":2001,"track":2,"albumTracks":11,"seconds":208,"source":"https://en.wikipedia.org/wiki/Is_This_It#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-the-modern-age-2001"},
    {"id":"soma","title":"Soma","album":"Is This It","group":"Is This It","release":"Is This It","year":2001,"track":3,"albumTracks":11,"seconds":153,"source":"https://en.wikipedia.org/wiki/Is_This_It#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-soma-2001"},
    {"id":"barely-legal","title":"Barely Legal","album":"Is This It","group":"Is This It","release":"Is This It","year":2001,"track":4,"albumTracks":11,"seconds":234,"source":"https://en.wikipedia.org/wiki/Is_This_It#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-barely-legal-2001"},
    {"id":"someday","title":"Someday","album":"Is This It","group":"Is This It","release":"Is This It","year":2001,"track":5,"albumTracks":11,"seconds":183,"source":"https://en.wikipedia.org/wiki/Is_This_It#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-someday-2001"},
    {"id":"alone-together","title":"Alone, Together","album":"Is This It","group":"Is This It","release":"Is This It","year":2001,"track":6,"albumTracks":11,"seconds":188,"source":"https://en.wikipedia.org/wiki/Is_This_It#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-alone-together-2001"},
    {"id":"last-nite","title":"Last Nite","album":"Is This It","group":"Is This It","release":"Is This It","year":2001,"track":7,"albumTracks":11,"seconds":193,"source":"https://en.wikipedia.org/wiki/Is_This_It#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-last-nite-2001"},
    {"id":"hard-to-explain","title":"Hard to Explain","album":"Is This It","group":"Is This It","release":"Is This It","year":2001,"track":8,"albumTracks":11,"seconds":224,"source":"https://en.wikipedia.org/wiki/Is_This_It#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-hard-to-explain-2001"},
    {"id":"new-york-city-cops","title":"New York City Cops","album":"Is This It","group":"Is This It","release":"Is This It","year":2001,"track":9,"albumTracks":11,"seconds":211,"source":"https://en.wikipedia.org/wiki/Is_This_It#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-new-york-city-cops-2001"},
    {"id":"trying-your-luck","title":"Trying Your Luck","album":"Is This It","group":"Is This It","release":"Is This It","year":2001,"track":10,"albumTracks":11,"seconds":202,"source":"https://en.wikipedia.org/wiki/Is_This_It#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-trying-your-luck-2001"},
    {"id":"take-it-or-leave-it","title":"Take It or Leave It","album":"Is This It","group":"Is This It","release":"Is This It","year":2001,"track":11,"albumTracks":11,"seconds":196,"source":"https://en.wikipedia.org/wiki/Is_This_It#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-take-it-or-leave-it-2001"},
    {"id":"when-it-started","title":"When It Started","album":"Is This It","group":"Is This It","release":"Is This It","year":2001,"track":9,"albumTracks":11,"seconds":175,"source":"https://en.wikipedia.org/wiki/Is_This_It#Track_listing","note":"US CD edition track 9, replacing New York City Cops.","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-when-it-started"},
    {"id":"what-ever-happened","title":"What Ever Happened?","album":"Room on Fire","group":"Room on Fire","release":"Room on Fire","year":2003,"track":1,"albumTracks":11,"seconds":169,"source":"https://en.wikipedia.org/wiki/Room_on_Fire#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-what-ever-happened"},
    {"id":"reptilia","title":"Reptilia","album":"Room on Fire","group":"Room on Fire","release":"Room on Fire","year":2003,"track":2,"albumTracks":11,"seconds":219,"source":"https://en.wikipedia.org/wiki/Room_on_Fire#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-reptilia"},
    {"id":"automatic-stop","title":"Automatic Stop","album":"Room on Fire","group":"Room on Fire","release":"Room on Fire","year":2003,"track":3,"albumTracks":11,"seconds":207,"source":"https://en.wikipedia.org/wiki/Room_on_Fire#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-automatic-stop"},
    {"id":"12-51","title":"12:51","album":"Room on Fire","group":"Room on Fire","release":"Room on Fire","year":2003,"track":4,"albumTracks":11,"seconds":153,"source":"https://en.wikipedia.org/wiki/Room_on_Fire#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://www.youtube.com/watch?v=LPAVDHo1Elc"},
    {"id":"you-talk-way-too-much","title":"You Talk Way Too Much","album":"Room on Fire","group":"Room on Fire","release":"Room on Fire","year":2003,"track":5,"albumTracks":11,"seconds":186,"source":"https://en.wikipedia.org/wiki/Room_on_Fire#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-you-talk-way-too-much"},
    {"id":"between-love-hate","title":"Between Love & Hate","album":"Room on Fire","group":"Room on Fire","release":"Room on Fire","year":2003,"track":6,"albumTracks":11,"seconds":196,"source":"https://en.wikipedia.org/wiki/Room_on_Fire#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-between-love-hate"},
    {"id":"meet-me-in-the-bathroom","title":"Meet Me in the Bathroom","album":"Room on Fire","group":"Room on Fire","release":"Room on Fire","year":2003,"track":7,"albumTracks":11,"seconds":176,"source":"https://en.wikipedia.org/wiki/Room_on_Fire#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-meet-me-in-the-bathroom"},
    {"id":"under-control","title":"Under Control","album":"Room on Fire","group":"Room on Fire","release":"Room on Fire","year":2003,"track":8,"albumTracks":11,"seconds":187,"source":"https://en.wikipedia.org/wiki/Room_on_Fire#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-under-control"},
    {"id":"the-way-it-is","title":"The Way It Is","album":"Room on Fire","group":"Room on Fire","release":"Room on Fire","year":2003,"track":9,"albumTracks":11,"seconds":141,"source":"https://en.wikipedia.org/wiki/Room_on_Fire#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-the-way-it-is"},
    {"id":"the-end-has-no-end","title":"The End Has No End","album":"Room on Fire","group":"Room on Fire","release":"Room on Fire","year":2003,"track":10,"albumTracks":11,"seconds":185,"source":"https://en.wikipedia.org/wiki/Room_on_Fire#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-the-end-has-no-end"},
    {"id":"i-cant-win","title":"I Can't Win","album":"Room on Fire","group":"Room on Fire","release":"Room on Fire","year":2003,"track":11,"albumTracks":11,"seconds":162,"source":"https://en.wikipedia.org/wiki/Room_on_Fire#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-i-can-t-win"},
    {"id":"you-only-live-once","title":"You Only Live Once","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":1,"albumTracks":14,"seconds":189,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-you-only-live-once"},
    {"id":"juicebox","title":"Juicebox","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":2,"albumTracks":14,"seconds":197,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-juicebox-2005"},
    {"id":"heart-in-a-cage","title":"Heart in a Cage","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":3,"albumTracks":14,"seconds":207,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-heart-in-a-cage"},
    {"id":"razorblade","title":"Razorblade","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":4,"albumTracks":14,"seconds":209,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-razorblade"},
    {"id":"on-the-other-side","title":"On the Other Side","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":5,"albumTracks":14,"seconds":278,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-on-the-other-side"},
    {"id":"vision-of-division","title":"Vision of Division","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":6,"albumTracks":14,"seconds":260,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-vision-of-division"},
    {"id":"ask-me-anything","title":"Ask Me Anything","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":7,"albumTracks":14,"seconds":192,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":null},
    {"id":"electricityscape","title":"Electricityscape","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":8,"albumTracks":14,"seconds":213,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-electricityscape"},
    {"id":"killing-lies","title":"Killing Lies","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":9,"albumTracks":14,"seconds":230,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-killing-lies"},
    {"id":"fear-of-sleep","title":"Fear of Sleep","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":10,"albumTracks":14,"seconds":240,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-fear-of-sleep"},
    {"id":"15-minutes","title":"15 Minutes","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":11,"albumTracks":14,"seconds":274,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":null},
    {"id":"ize-of-the-world","title":"Ize of the World","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":12,"albumTracks":14,"seconds":269,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":null},
    {"id":"evening-sun","title":"Evening Sun","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":13,"albumTracks":14,"seconds":186,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-evening-sun"},
    {"id":"red-light","title":"Red Light","album":"First Impressions of Earth","group":"First Impressions of Earth","release":"First Impressions of Earth","year":2006,"track":14,"albumTracks":14,"seconds":191,"source":"https://en.wikipedia.org/wiki/First_Impressions_of_Earth#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-red-light"},
    {"id":"machu-picchu","title":"Machu Picchu","album":"Angles","group":"Angles","release":"Angles","year":2011,"track":1,"albumTracks":10,"seconds":212,"source":"https://en.wikipedia.org/wiki/Angles_(The_Strokes_album)#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-machu-picchu"},
    {"id":"under-cover-of-darkness","title":"Under Cover of Darkness","album":"Angles","group":"Angles","release":"Angles","year":2011,"track":2,"albumTracks":10,"seconds":237,"source":"https://en.wikipedia.org/wiki/Angles_(The_Strokes_album)#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-under-cover-of-darkness"},
    {"id":"two-kinds-of-happiness","title":"Two Kinds of Happiness","album":"Angles","group":"Angles","release":"Angles","year":2011,"track":3,"albumTracks":10,"seconds":224,"source":"https://en.wikipedia.org/wiki/Angles_(The_Strokes_album)#Track_listing","cover":false,"titleSung":null},
    {"id":"youre-so-right","title":"You're So Right","album":"Angles","group":"Angles","release":"Angles","year":2011,"track":4,"albumTracks":10,"seconds":154,"source":"https://en.wikipedia.org/wiki/Angles_(The_Strokes_album)#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-you-re-so-right"},
    {"id":"taken-for-a-fool","title":"Taken for a Fool","album":"Angles","group":"Angles","release":"Angles","year":2011,"track":5,"albumTracks":10,"seconds":205,"source":"https://en.wikipedia.org/wiki/Angles_(The_Strokes_album)#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-taken-for-a-fool"},
    {"id":"games","title":"Games","album":"Angles","group":"Angles","release":"Angles","year":2011,"track":6,"albumTracks":10,"seconds":232,"source":"https://en.wikipedia.org/wiki/Angles_(The_Strokes_album)#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-games"},
    {"id":"call-me-back","title":"Call Me Back","album":"Angles","group":"Angles","release":"Angles","year":2011,"track":7,"albumTracks":10,"seconds":183,"source":"https://en.wikipedia.org/wiki/Angles_(The_Strokes_album)#Track_listing","cover":false,"titleSung":null},
    {"id":"gratisfaction","title":"Gratisfaction","album":"Angles","group":"Angles","release":"Angles","year":2011,"track":8,"albumTracks":10,"seconds":179,"source":"https://en.wikipedia.org/wiki/Angles_(The_Strokes_album)#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-gratisfaction"},
    {"id":"metabolism","title":"Metabolism","album":"Angles","group":"Angles","release":"Angles","year":2011,"track":9,"albumTracks":10,"seconds":185,"source":"https://en.wikipedia.org/wiki/Angles_(The_Strokes_album)#Track_listing","cover":false,"titleSung":null},
    {"id":"life-is-simple-in-the-moonlight","title":"Life Is Simple in the Moonlight","album":"Angles","group":"Angles","release":"Angles","year":2011,"track":10,"albumTracks":10,"seconds":255,"source":"https://en.wikipedia.org/wiki/Angles_(The_Strokes_album)#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-life-is-simple-in-the-moonlight"},
    {"id":"tap-out","title":"Tap Out","album":"Comedown Machine","group":"Comedown Machine","release":"Comedown Machine","year":2013,"track":1,"albumTracks":11,"seconds":222,"source":"https://en.wikipedia.org/wiki/Comedown_Machine#Track_listing","cover":false,"titleSung":null},
    {"id":"all-the-time","title":"All the Time","album":"Comedown Machine","group":"Comedown Machine","release":"Comedown Machine","year":2013,"track":2,"albumTracks":11,"seconds":181,"source":"https://en.wikipedia.org/wiki/Comedown_Machine#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-all-the-time"},
    {"id":"one-way-trigger","title":"One Way Trigger","album":"Comedown Machine","group":"Comedown Machine","release":"Comedown Machine","year":2013,"track":3,"albumTracks":11,"seconds":242,"source":"https://en.wikipedia.org/wiki/Comedown_Machine#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-one-way-trigger"},
    {"id":"welcome-to-japan","title":"Welcome to Japan","album":"Comedown Machine","group":"Comedown Machine","release":"Comedown Machine","year":2013,"track":4,"albumTracks":11,"seconds":230,"source":"https://en.wikipedia.org/wiki/Comedown_Machine#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-welcome-to-japan"},
    {"id":"80s-comedown-machine","title":"80's Comedown Machine","album":"Comedown Machine","group":"Comedown Machine","release":"Comedown Machine","year":2013,"track":5,"albumTracks":11,"seconds":298,"source":"https://en.wikipedia.org/wiki/Comedown_Machine#Track_listing","cover":false,"titleSung":null},
    {"id":"50-50","title":"50/50","album":"Comedown Machine","group":"Comedown Machine","release":"Comedown Machine","year":2013,"track":6,"albumTracks":11,"seconds":163,"source":"https://en.wikipedia.org/wiki/Comedown_Machine#Track_listing","cover":false,"titleSung":null},
    {"id":"slow-animals","title":"Slow Animals","album":"Comedown Machine","group":"Comedown Machine","release":"Comedown Machine","year":2013,"track":7,"albumTracks":11,"seconds":260,"source":"https://en.wikipedia.org/wiki/Comedown_Machine#Track_listing","cover":false,"titleSung":null},
    {"id":"partners-in-crime","title":"Partners in Crime","album":"Comedown Machine","group":"Comedown Machine","release":"Comedown Machine","year":2013,"track":8,"albumTracks":11,"seconds":201,"source":"https://en.wikipedia.org/wiki/Comedown_Machine#Track_listing","cover":false,"titleSung":null},
    {"id":"chances","title":"Chances","album":"Comedown Machine","group":"Comedown Machine","release":"Comedown Machine","year":2013,"track":9,"albumTracks":11,"seconds":216,"source":"https://en.wikipedia.org/wiki/Comedown_Machine#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-chances"},
    {"id":"happy-ending","title":"Happy Ending","album":"Comedown Machine","group":"Comedown Machine","release":"Comedown Machine","year":2013,"track":10,"albumTracks":11,"seconds":172,"source":"https://en.wikipedia.org/wiki/Comedown_Machine#Track_listing","cover":false,"titleSung":null},
    {"id":"call-it-fate-call-it-karma","title":"Call It Fate, Call It Karma","album":"Comedown Machine","group":"Comedown Machine","release":"Comedown Machine","year":2013,"track":11,"albumTracks":11,"seconds":204,"source":"https://en.wikipedia.org/wiki/Comedown_Machine#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-call-it-fate-call-it-karma"},
    {"id":"the-adults-are-talking","title":"The Adults Are Talking","album":"The New Abnormal","group":"The New Abnormal","release":"The New Abnormal","year":2020,"track":1,"albumTracks":9,"seconds":309,"source":"https://en.wikipedia.org/wiki/The_New_Abnormal#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-the-adults-are-talking"},
    {"id":"selfless","title":"Selfless","album":"The New Abnormal","group":"The New Abnormal","release":"The New Abnormal","year":2020,"track":2,"albumTracks":9,"seconds":222,"source":"https://en.wikipedia.org/wiki/The_New_Abnormal#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-selfless"},
    {"id":"brooklyn-bridge-to-chorus","title":"Brooklyn Bridge to Chorus","album":"The New Abnormal","group":"The New Abnormal","release":"The New Abnormal","year":2020,"track":3,"albumTracks":9,"seconds":235,"source":"https://en.wikipedia.org/wiki/The_New_Abnormal#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-brooklyn-bridge-to-chorus"},
    {"id":"bad-decisions","title":"Bad Decisions","album":"The New Abnormal","group":"The New Abnormal","release":"The New Abnormal","year":2020,"track":4,"albumTracks":9,"seconds":293,"source":"https://en.wikipedia.org/wiki/The_New_Abnormal#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-bad-decisions"},
    {"id":"eternal-summer","title":"Eternal Summer","album":"The New Abnormal","group":"The New Abnormal","release":"The New Abnormal","year":2020,"track":5,"albumTracks":9,"seconds":375,"source":"https://en.wikipedia.org/wiki/The_New_Abnormal#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-eternal-summer"},
    {"id":"at-the-door","title":"At the Door","album":"The New Abnormal","group":"The New Abnormal","release":"The New Abnormal","year":2020,"track":6,"albumTracks":9,"seconds":310,"source":"https://en.wikipedia.org/wiki/The_New_Abnormal#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-at-the-door"},
    {"id":"why-are-sundays-so-depressing","title":"Why Are Sundays So Depressing","album":"The New Abnormal","group":"The New Abnormal","release":"The New Abnormal","year":2020,"track":7,"albumTracks":9,"seconds":275,"source":"https://en.wikipedia.org/wiki/The_New_Abnormal#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-why-are-sundays-so-depressing"},
    {"id":"not-the-same-anymore","title":"Not the Same Anymore","album":"The New Abnormal","group":"The New Abnormal","release":"The New Abnormal","year":2020,"track":8,"albumTracks":9,"seconds":337,"source":"https://en.wikipedia.org/wiki/The_New_Abnormal#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-not-the-same-anymore"},
    {"id":"ode-to-the-mets","title":"Ode to the Mets","album":"The New Abnormal","group":"The New Abnormal","release":"The New Abnormal","year":2020,"track":9,"albumTracks":9,"seconds":351,"source":"https://en.wikipedia.org/wiki/The_New_Abnormal#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-ode-to-the-mets"},
    {"id":"psycho-shit","title":"Psycho Shit","album":"Reality Awaits","group":"Reality Awaits","release":"Reality Awaits","year":2026,"track":1,"albumTracks":9,"seconds":323,"source":"https://shop.thestrokes.com/products/reality-awaits-lp","durationSource":"https://en.wikipedia.org/wiki/Reality_Awaits#Track_listing","cover":false,"titleSung":null},
    {"id":"dine-ndash","title":"Dine N'Dash","album":"Reality Awaits","group":"Reality Awaits","release":"Reality Awaits","year":2026,"track":2,"albumTracks":9,"seconds":303,"source":"https://shop.thestrokes.com/products/reality-awaits-lp","durationSource":"https://en.wikipedia.org/wiki/Reality_Awaits#Track_listing","cover":false,"titleSung":null},
    {"id":"lonely-in-the-future","title":"Lonely in the Future","album":"Reality Awaits","group":"Reality Awaits","release":"Reality Awaits","year":2026,"track":3,"albumTracks":9,"seconds":200,"source":"https://shop.thestrokes.com/products/reality-awaits-lp","durationSource":"https://en.wikipedia.org/wiki/Reality_Awaits#Track_listing","cover":false,"titleSung":null},
    {"id":"falling-out-of-love","title":"Falling out of Love","album":"Reality Awaits","group":"Reality Awaits","release":"Reality Awaits","year":2026,"track":4,"albumTracks":9,"seconds":381,"source":"https://shop.thestrokes.com/products/reality-awaits-lp","durationSource":"https://en.wikipedia.org/wiki/Reality_Awaits#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-falling-out-of-love"},
    {"id":"going-to-babble-on","title":"Going to Babble On","album":"Reality Awaits","group":"Reality Awaits","release":"Reality Awaits","year":2026,"track":5,"albumTracks":9,"seconds":246,"source":"https://shop.thestrokes.com/products/reality-awaits-lp","durationSource":"https://en.wikipedia.org/wiki/Reality_Awaits#Track_listing","cover":false,"titleSung":null},
    {"id":"going-shopping","title":"Going Shopping","album":"Reality Awaits","group":"Reality Awaits","release":"Reality Awaits","year":2026,"track":6,"albumTracks":9,"seconds":258,"source":"https://shop.thestrokes.com/products/reality-awaits-lp","durationSource":"https://en.wikipedia.org/wiki/Reality_Awaits#Track_listing","cover":false,"titleSung":true,"lyricsSource":"https://readdork.com/lyrics/the-strokes-going-shopping"},
    {"id":"liars-remorse","title":"Liar's Remorse","album":"Reality Awaits","group":"Reality Awaits","release":"Reality Awaits","year":2026,"track":7,"albumTracks":9,"seconds":290,"source":"https://shop.thestrokes.com/products/reality-awaits-lp","durationSource":"https://en.wikipedia.org/wiki/Reality_Awaits#Track_listing","cover":false,"titleSung":null},
    {"id":"the-fruits-of-conquest","title":"The Fruits of Conquest","album":"Reality Awaits","group":"Reality Awaits","release":"Reality Awaits","year":2026,"track":8,"albumTracks":9,"seconds":308,"source":"https://shop.thestrokes.com/products/reality-awaits-lp","durationSource":"https://en.wikipedia.org/wiki/Reality_Awaits#Track_listing","cover":false,"titleSung":null},
    {"id":"tyrants-of-the-mellow-moon","title":"Tyrants of the Mellow Moon","album":"Reality Awaits","group":"Reality Awaits","release":"Reality Awaits","year":2026,"track":9,"albumTracks":9,"seconds":250,"source":"https://shop.thestrokes.com/products/reality-awaits-lp","durationSource":"https://en.wikipedia.org/wiki/Reality_Awaits#Track_listing","cover":false,"titleSung":null},
    {"id":"drag-queen","title":"Drag Queen","album":null,"group":"Future Present Past","release":"Future Present Past","year":2016,"track":1,"albumTracks":0,"seconds":273,"source":"https://en.wikipedia.org/wiki/Future_Present_Past#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-drag-queen"},
    {"id":"oblivius","title":"Oblivius","album":null,"group":"Future Present Past","release":"Future Present Past","year":2016,"track":2,"albumTracks":0,"seconds":300,"source":"https://en.wikipedia.org/wiki/Future_Present_Past#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-oblivius"},
    {"id":"threat-of-joy","title":"Threat of Joy","album":null,"group":"Future Present Past","release":"Future Present Past","year":2016,"track":3,"albumTracks":0,"seconds":264,"source":"https://en.wikipedia.org/wiki/Future_Present_Past#Track_listing","cover":false,"titleSung":false,"lyricsSource":"https://readdork.com/lyrics/the-strokes-threat-of-joy"},
    {"id":"modern-girls-old-fashion-men","title":"Modern Girls & Old Fashion Men","year":2004,"release":"Reptilia (B-side)","seconds":null,"source":"https://www.legacyrecordings.com/2023/02/24/the-strokes-the-singles-volume-01-box-set-available-now/","cover":false,"note":"With Regina Spektor.","album":null,"group":"B-sides, bonus tracks & covers","track":null,"albumTracks":0,"titleSung":null},
    {"id":"clampdown","title":"Clampdown","year":2004,"release":"The End Has No End (B-side)","seconds":null,"source":"https://www.legacyrecordings.com/2023/02/24/the-strokes-the-singles-volume-01-box-set-available-now/","cover":true,"note":"The Clash cover; live at Alexandra Palace.","album":null,"group":"B-sides, bonus tracks & covers","track":null,"albumTracks":0,"titleSung":null},
    {"id":"elephant-song","title":"Elephant Song","year":2004,"release":"Fan-club single","seconds":null,"source":"https://eil.com/shop/moreinfo.asp?catalogid=386575","cover":false,"note":"Official limited fan-club release.","album":null,"group":"B-sides, bonus tracks & covers","track":null,"albumTracks":0,"titleSung":null},
    {"id":"hawaii","title":"Hawaii","year":2005,"release":"Juicebox (B-side)","seconds":null,"source":"https://www.legacyrecordings.com/2023/02/24/the-strokes-the-singles-volume-01-box-set-available-now/","cover":false,"album":null,"group":"B-sides, bonus tracks & covers","track":null,"albumTracks":0,"titleSung":null},
    {"id":"ill-try-anything-once","title":"I'll Try Anything Once","year":2006,"release":"Heart in a Cage (B-side)","seconds":195,"source":"https://en.wikipedia.org/wiki/Heart_in_a_Cage#Track_listings","cover":false,"note":"Separately titled early version of You Only Live Once.","album":null,"group":"B-sides, bonus tracks & covers","track":null,"albumTracks":0,"titleSung":null},
    {"id":"lifes-a-gas","title":"Life's a Gas","year":2006,"release":"Heart in a Cage (B-side)","seconds":187,"source":"https://en.wikipedia.org/wiki/Heart_in_a_Cage#Track_listings","cover":true,"note":"Ramones cover; includes excerpts from Don't Go and The KKK Took My Baby Away.","album":null,"group":"B-sides, bonus tracks & covers","track":null,"albumTracks":0,"titleSung":null},
    {"id":"mercy-mercy-me-the-ecology","title":"Mercy Mercy Me (The Ecology)","year":2006,"release":"You Only Live Once (B-side)","seconds":null,"source":"https://www.legacyrecordings.com/2023/02/24/the-strokes-the-singles-volume-01-box-set-available-now/","cover":true,"note":"Marvin Gaye cover with Eddie Vedder and Josh Homme.","album":null,"group":"B-sides, bonus tracks & covers","track":null,"albumTracks":0,"titleSung":null},
    {"id":"fast-animals","title":"Fast Animals","year":2013,"release":"All the Time (B-side) / Japanese bonus track","seconds":223,"source":"https://en.wikipedia.org/wiki/All_the_Time_(The_Strokes_song)#Track_listing","cover":false,"note":"Bonus track on the Japanese Comedown Machine edition.","album":null,"group":"B-sides, bonus tracks & covers","track":null,"albumTracks":0,"titleSung":null}
  ];

  // Derive answers here to avoid stale booleans when adding/editing songs.
  // LISTENER CLUE EVIDENCE (checked 2026-11-13).
  // Explicit Yes AND No facts checked against each linked published lyric.
  // Only these exact recordings were checked; a new song is NOT implicitly No.
  // Add its ID, source and verified booleans here. Omitted facts stay null.
  // No complete lyrics are stored or downloaded by the game.
  const listenerFacts = {
    'is-this-it': { source: 'https://readdork.com/lyrics/the-strokes-is-this-it-2001',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'the-modern-age': { source: 'https://readdork.com/lyrics/the-strokes-the-modern-age-2001',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'soma': { source: 'https://readdork.com/lyrics/the-strokes-soma',
      titleOpening: true, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'barely-legal': { source: 'https://readdork.com/lyrics/the-strokes-barely-legal-2001',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: true, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'someday': { source: 'https://readdork.com/lyrics/the-strokes-someday-2001',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'alone-together': { source: 'https://readdork.com/lyrics/the-strokes-alone-together-2001',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'last-nite': { source: 'https://readdork.com/lyrics/the-strokes-last-nite-2001',
      titleOpening: true, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'hard-to-explain': { source: 'https://readdork.com/lyrics/the-strokes-hard-to-explain-2001',
      titleOpening: false, lyricTV: true, lyricDay: false, lyricWait: false, differentView: true, drumsPlease: false, newFriends: false, lifeShort: false },
    'new-york-city-cops': { source: 'https://readdork.com/lyrics/the-strokes-new-york-city-cops-2001',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'trying-your-luck': { source: 'https://readdork.com/lyrics/the-strokes-trying-your-luck-2001',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'take-it-or-leave-it': { source: 'https://readdork.com/lyrics/the-strokes-take-it-or-leave-it-2001',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'when-it-started': { source: 'https://readdork.com/lyrics/the-strokes-when-it-started',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: true, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'what-ever-happened': { source: 'https://readdork.com/lyrics/the-strokes-what-ever-happened',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: true, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'reptilia': { source: 'https://readdork.com/lyrics/the-strokes-reptilia',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: true, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'automatic-stop': { source: 'https://readdork.com/lyrics/the-strokes-automatic-stop',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: true, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    '12-51': { source: 'https://readdork.com/lyrics/the-strokes-12-51',
      titleOpening: false, lyricTV: false, lyricDay: true, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'you-talk-way-too-much': { source: 'https://readdork.com/lyrics/the-strokes-you-talk-way-too-much',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'between-love-hate': { source: 'https://readdork.com/lyrics/the-strokes-between-love-hate',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'meet-me-in-the-bathroom': { source: 'https://readdork.com/lyrics/the-strokes-meet-me-in-the-bathroom',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'under-control': { source: 'https://readdork.com/lyrics/the-strokes-under-control',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'the-way-it-is': { source: 'https://readdork.com/lyrics/the-strokes-the-way-it-is',
      titleOpening: false, lyricTV: false, lyricDay: true, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'the-end-has-no-end': { source: 'https://readdork.com/lyrics/the-strokes-the-end-has-no-end',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: true, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'i-cant-win': { source: 'https://readdork.com/lyrics/the-strokes-i-can-t-win',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: true, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'the-adults-are-talking': { source: 'https://readdork.com/lyrics/the-strokes-the-adults-are-talking',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: true, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'selfless': { source: 'https://readdork.com/lyrics/the-strokes-selfless',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: true, differentView: false, drumsPlease: false, newFriends: false, lifeShort: true },
    'brooklyn-bridge-to-chorus': { source: 'https://readdork.com/lyrics/the-strokes-brooklyn-bridge-to-chorus',
      titleOpening: false, lyricTV: true, lyricDay: false, lyricWait: true, differentView: false, drumsPlease: false, newFriends: true, lifeShort: false },
    'bad-decisions': { source: 'https://readdork.com/lyrics/the-strokes-bad-decisions',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'eternal-summer': { source: 'https://readdork.com/lyrics/the-strokes-eternal-summer',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'at-the-door': { source: 'https://readdork.com/lyrics/the-strokes-at-the-door',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: true, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'why-are-sundays-so-depressing': { source: 'https://readdork.com/lyrics/the-strokes-why-are-sundays-so-depressing',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: true, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'not-the-same-anymore': { source: 'https://readdork.com/lyrics/the-strokes-not-the-same-anymore',
      titleOpening: false, lyricTV: false, lyricDay: true, lyricWait: false, differentView: false, drumsPlease: false, newFriends: false, lifeShort: false },
    'ode-to-the-mets': { source: 'https://readdork.com/lyrics/the-strokes-ode-to-the-mets',
      titleOpening: false, lyricTV: false, lyricDay: false, lyricWait: true, differentView: false, drumsPlease: true, newFriends: false, lifeShort: false }
  };

  const listenerQuestions = [
    ['titleOpening', 'Are the first words sung the song\'s full title?', 'Ignore non-word sounds such as oh or ah. The title must start the first sung phrase; go by sound, not spelling.'],
    ['lyricTV', 'Do the lyrics mention TV, television or radio?', 'Listen for one of those words in the reference recording, not what happens in the music video.'],
    ['lyricDay', 'Do the lyrics name a day of the week?', 'Monday through Sunday, including plurals. Weekdays, yesterday and tomorrow do not count; the title alone does not count.'],
    ['lyricWait', 'Do you hear the word “wait” or “waiting” in the lyrics?', 'Waitin\' counts as waiting. Waited, waste and wasting do not count.'],
    ['differentView', 'Do you hear “I don\'t see it that way” repeated?', 'Think of the repeated vocal phrase in the reference recording.'],
    ['drumsPlease', 'Does Julian say “Drums please, Fab” in the song?', 'Count the spoken moment in the recording, not stage banter at a concert.'],
    ['newFriends', 'Does Julian sing “I want new friends”?', 'Think of that phrase in the vocals, not the title or video.'],
    ['lifeShort', 'Does Julian sing “Life is too short”?', 'Think of that phrase in the reference recording.']
  ];

  // Answerability is an editable 1–5 editorial rating, not a confidence score.
  // 5: recognizable vocals; 4: literal title; 3: album/era; 2: duration;
  // 1: track-position trivia. Keep positions available as last-resort clues.
  const question = (id, text, hint, answer) => ({
    id, text, hint, answer,
    answerability: id === 'titleSung' ? 5 :
      ['oneWord', 'longTitle', 'veryLongTitle', 'number', 'hasThe'].includes(id) ? 4 :
      id === 'over4' ? 2 : /^(evenTrack|first\d+|opener|epOpener)$/.test(id) ? 1 : 3,
    allowsUnknown: ['titleSung', 'over4'].includes(id)
  });
  const questions = [
    ...listenerQuestions.map(([id, text, hint]) => ({
      id, text, hint, answerability: 5, allowsUnknown: true, category: 'listener',
      answer: song => listenerFacts[song.id]?.[id] ?? null
    })),
    question('before2010', 'Was your song released before 2010?', 'Use its original official release, rather than a reissue or live debut.', s => s.year < 2010),
    question('before2004', 'Was your song released before 2004?', 'Use the original official release of the song.', s => s.year < 2004),
    question('before2015', 'Was your song released before 2015?', 'Use the original official release, not a later compilation.', s => s.year < 2015),
    question('from2020', 'Was your song released in 2020 or later?', 'Think of its official release, rather than an earlier concert performance.', s => s.year >= 2020),
    question('titleSung', 'Do you hear the full song title sung in the lyrics?', 'All title words in order, anywhere in the reference recording. Go by sound, not spelling.', s => s.titleSung),
    question('over4', 'Is the reference recording longer than four minutes?', 'Use the album version, or original B-side for a non-album song. Exactly four minutes means No.', s => s.seconds === null ? null : s.seconds > 240),
    question('oneWord', 'Is the song’s title a single word?', 'One written word. A title made only of digits, like 12:51 or 50/50, does not count.', s => /^[A-Za-z]+$/.test(s.title)),
    question('longTitle', 'Does the printed title have four or more words?', 'Count words separated by spaces; count & as one word and include words in parentheses.', s => s.title.split(/\s+/).length >= 4),
    question('veryLongTitle', 'Does the printed title have five or more words?', 'Count words separated by spaces; count & as one word and include words in parentheses.', s => s.title.split(/\s+/).length >= 5),
    question('epOpener', 'Is your song the opening track of the Future Present Past EP?', 'Use track one on the original 2016 EP.', s => s.group === 'Future Present Past' && s.track === 1),
    question('number', 'Does the song’s title contain a numeral?', 'A written digit, like 1 or 2, rather than a number spelled out.', s => /\d/.test(s.title)),
    question('hasThe', 'Does the printed title contain the word “the”?', 'Count the standalone word anywhere in the title.', s => /\bthe\b/i.test(s.title)),
    question('studioAlbum', 'Does your song appear on a Strokes studio album?', 'Include regional editions and bonus tracks. EP-only songs and non-album B-sides mean No.', s => s.album !== null || s.id === 'fast-animals'),
    question('cover', 'Is your song a cover of another artist’s song?', 'An actual cover, rather than an original song that borrows a melody.', s => s.cover),
    question('opener', 'Is your song the opening track on a studio album?', 'Track one of the whole original album. A vinyl Side B opener or EP opener does not count.', s => s.album !== null && s.track === 1),
    question('evenTrack', 'Is your song an even-numbered track on its studio album?', 'Tracks 2, 4, 6 and so on. Non-album songs mean No; Fast Animals is bonus track 12.', s => s.id === 'fast-animals' || (s.album !== null && s.track % 2 === 0)),
    ...[2, 4, 6, 8, 10, 12].map(last => question('first' + last, 'Is your song among the first ' + last + ' tracks on its studio album?', 'Use the full album order, not a playlist. Non-album songs mean No; Fast Animals is bonus track 12.', s => s.id === 'fast-animals' ? last >= 12 : s.album !== null && s.track <= last)),
    ...[
      ['debut', 'Is This It'], ['room', 'Room on Fire'],
      ['impressions', 'First Impressions of Earth'], ['angles', 'Angles'],
      ['comedown', 'Comedown Machine'], ['abnormal', 'The New Abnormal'],
      ['reality', 'Reality Awaits']
    ].map(([id, album]) => question(id, 'Is your song on ' + album + '?', 'Include regional editions and bonus tracks.', s => s.album === album || (id === 'comedown' && s.id === 'fast-animals'))),
    question('futurePresentPast', 'Is your song on the Future Present Past EP?', 'The 2016 EP with Drag Queen, Oblivius and Threat of Joy.', s => s.group === 'Future Present Past')
  ];

  songs.forEach(song => {
    song.answers = Object.fromEntries(questions.map(q => [q.id, q.answer(song)]));
  });

  function validateCatalog() {
    if (!songs.length) throw new Error('Add at least one song to songs-data.js.');
    for (const [name, entries] of [['song', songs], ['question', questions]]) {
      if (new Set(entries.map(entry => entry.id)).size !== entries.length) throw new Error('Duplicate ' + name + ' ID in songs-data.js.');
    }
    questions.forEach(q => {
      if (!Number.isInteger(q.answerability) || q.answerability < 1 || q.answerability > 5)
        throw new Error('Answerability must be an integer from 1 to 5: ' + q.id);
    });
    Object.entries(listenerFacts).forEach(([id, facts]) => {
      if (!songs.some(song => song.id === id)) throw new Error('Unknown song in listener evidence: ' + id);
      if (!facts.source?.startsWith('https://')) throw new Error('Missing listener evidence: ' + id);
      Object.entries(facts).forEach(([key, value]) => {
        if (key === 'source') return;
        if (!listenerQuestions.some(([questionId]) => questionId === key)) throw new Error('Unknown listener clue: ' + key);
        if (typeof value !== 'boolean' && value !== null) throw new Error('Invalid listener fact: ' + id + ' / ' + key);
      });
    });
    songs.forEach(song => {
      if (!song.source || !Number.isInteger(song.year)) throw new Error('Missing source/year: ' + song.id);
      if (song.titleSung !== null && !song.lyricsSource) throw new Error('Missing lyric evidence: ' + song.id);
      questions.forEach(q => {
        const answer = song.answers[q.id];
        if (typeof answer !== 'boolean' && answer !== null) throw new Error('Missing boolean/null answer: ' + song.id + ' / ' + q.id);
        if (answer === null && !q.allowsUnknown) throw new Error('Unverified factual clue: ' + song.id + ' / ' + q.id);
      });
    });
  }
  validateCatalog();
  const sources = [...new Set([
    ...songs.flatMap(s => [s.source, s.durationSource, s.lyricsSource].filter(Boolean)),
    ...Object.values(listenerFacts).map(facts => facts.source)
  ])];
  root.SCOTTINATOR_DATA = {
    songs, questions, sources, listenerFacts, checkedThrough: '2026-11-11', listenerCheckedThrough: '2026-11-13',
    scope: 'Distinct officially released song titles; alternate recordings and remixes share one choice.'
  };
  if (typeof module !== 'undefined') module.exports = root.SCOTTINATOR_DATA;
})(globalThis);
