var board = {
	name: "Al's Favourite Gutenberg Books",
	avatar: "img/avatar.jpg",
	shelves: [
		{
			title: "Classic Adventures",
			items: [
				{
					id: 1,
					title: "Around the World in Eighty Days",
					author: "Jules Verne",
					img: "img/covers/80days.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/103",
					readLink: "https://www.gutenberg.org/files/103/103-h/103-h.htm",
					quote: "Follow the eccentric Phileas Fogg around the world as he makes good on a bet - all while keeping up the British sensibilities!"
				},
				{
					id: 2,
					title: "The Three Musketeers",
					author: "Alexandre Dumas",
					img: "img/covers/3musket.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/1257",
					readLink: "https://www.gutenberg.org/files/1257/1257-h/1257-h.htm",
					quote: "D'Artagnan travels to Paris to join Her Majesty's Musketeers - and is quickly thrust into romance, swordfights and politics."
				},
				{
					id: 3,
					title: "The Count of Monte Cristo",
					author: "Alexandre Dumas",
					img: "img/covers/monte.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/1184",
					readLink: "https://www.gutenberg.org/files/1184/1184-h/1184-h.htm",
					quote: "The quintessential revenge tale, set in Napoleonic France."
				},
				{
					id: 4,
					title: "Peter Pan",
					author: "J.M. Barrie",
					img: "img/covers/peterpan.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/16",
					readLink: "https://www.gutenberg.org/files/16/16-h/16-h.htm",
					quote: "This book is a lot darker than you might think."
				},
				{
					id: 5,
					title: "Call of the Wild",
					author: "Jack London",
					img: "img/covers/wild.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/215",
					readLink: "https://www.gutenberg.org/files/215/215-h/215-h.htm",
					quote: "Classic light reading.  Buck the domestic dog is kidnapped to serve as a sled dog, where he learns to tap into his primal nature."
				},
			]//items
		},
		{
			title: "I'm on a Boat",
			items: [
				{
					id: 6,
					title: "Two Years Before the Mast",
					author: "Richard Henry Dana Jr.",
					img: "img/covers/dana.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/2055",
					readLink: "https://www.gutenberg.org/files/2055/2055-h/2055-h.htm",
					quote: "Fascinating true story of a Boston lad's two year journey as a common sailor on a California merchant ship."
				},
				{
					id: 7,
					title: "Moby Dick",
					author: "Herman Melville",
					img: "img/covers/moby.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/2701",
					readLink: "https://www.gutenberg.org/files/2701/2701-h/2701-h.htm",
					quote: "Long and dense.  Learn about how whale boats worked while keeping an eye on the obsessive Captain Ahab searching for a savage white whale."
				},
				{
					id: 8,
					title: "Treasure Island",
					author: "Robert Louis Stevenson",
					img: "img/covers/treasure.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/120",
					readLink: "http://www.gutenberg.org/files/120/old/files/relative.htm",
					quote: "A lot of misconceptions about pirates come from this book."
				},
				{
					id: 9,
					title: "Three Men in a Boat (to say nothing of the dog)",
					author: "Jerome K. Jerome",
					img: "img/covers/3men.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/308",
					readLink: "https://www.gutenberg.org/files/308/308-h/308-h.htm",
					quote: "The amusing journey of 3 stiff and self-aware british gents (and their dog) down the River Thames."
				},
			]//items
		},
		{
			title: "Mature Themes",
			items: [
				{
					id: 10,
					title: "The Picture of Dorian Gray",
					author: "Oscar Wilde",
					img: "img/covers/dorian.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/174",
					readLink: "https://www.gutenberg.org/files/174/174-h/174-h.htm",
					quote: "What would you do if you discovered a fountain of youth?"
				},
				{
					id: 11,
					title: "Peter Pan",
					author: "J.M. Barrie",
					img: "img/covers/peterpan.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/16",
					readLink: "https://www.gutenberg.org/files/16/16-h/16-h.htm",
					quote: "This book is a lot darker than you might think."
				},
				{
					id: 12,
					title: "The Brother Karamazov",
					author: "Fyodor Dostoyevsky",
					img: "img/covers/karamazov.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/28054",
					readLink: "https://www.gutenberg.org/files/28054/28054-h/28054-h.html",
					quote: "It's been said that every human relationship can be found within the pages of this book."
				},
			]//items
		},
		{
			title: "Old School Comedy",
			items: [
				{
					id: 13,
					title: "The Importance of Being Earnest",
					author: "Oscar Wilde",
					img: "img/covers/earnest.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/844",
					readLink: "https://www.gutenberg.org/files/844/844-h/844-h.htm",
					quote: "A hilarious farce, adapted dozens of times for stage and screen."
				},
				{
					id: 14,
					title: "Three Men in a Boat (to say nothing of the dog)",
					author: "Jerome K. Jerome",
					img: "img/covers/3men.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/308",
					readLink: "https://www.gutenberg.org/files/308/308-h/308-h.htm",
					quote: "The amusing journey of 3 stiff and self-aware british gents (and their dog) down the River Thames."
				},
			]//items
		},
		{
			title: "Light-Hearted Adventure",
			items: [
				{
					id: 15,
					title: "The Adventures of Tom Sawyer",
					author: "Mark Twain",
					img: "img/covers/tomsawyer.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/74",
					readLink: "https://www.gutenberg.org/files/74/74-h/74-h.htm",
					quote: "Tom Sawyer is perpetually in trouble, but always seems to outsmart everyone in his sleepy southern town."
				},
				{
					id: 16,
					title: "The Adventures of Huckleberry Finn",
					author: "Mark Twain",
					img: "img/covers/huckleberry.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/76",
					readLink: "https://www.gutenberg.org/files/76/76-h/76-h.htm",
					quote: "The sequel to Tom Sawyer, this is a hilarious satire of southern culture. Twain's jokes are subtle, can you catch them?"
				},
				{
					id: 17,
					title: "Three Men in a Boat (to say nothing of the dog)",
					author: "Jerome K. Jerome",
					img: "img/covers/3men.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/308",
					readLink: "https://www.gutenberg.org/files/308/308-h/308-h.htm",
					quote: "The amusing journey of 3 stiff and self-aware british gents (and their dog) down the River Thames."
				},
				{
					id: 18,
					title: "Around the World in Eighty Days",
					author: "Jules Verne",
					img: "img/covers/80days.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/103",
					readLink: "https://www.gutenberg.org/files/103/103-h/103-h.htm",
					quote: "Follow the eccentric Phileas Fogg around the world as he makes good on a bet - all while keeping up the British sensibilities!"
				},
				{
					id: 19,
					title: "The Three Musketeers",
					author: "Alexandre Dumas",
					img: "img/covers/3musket.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/1257",
					readLink: "https://www.gutenberg.org/files/1257/1257-h/1257-h.htm",
					quote: "D'Artagnan travels to Paris to join Her Majesty's Musketeers - and is quickly thrust into romance, swordfights and politics."
				},
				{
					id: 20,
					title: "Treasure Island",
					author: "Robert Louis Stevenson",
					img: "img/covers/treasure.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/120",
					readLink: "http://www.gutenberg.org/files/120/old/files/relative.htm",
					quote: "A lot of misconceptions about pirates come from this book."
				},
			]//items
		},
		{
			title: "These Books Will Make You Think",
			items: [
				{
					id: 21,
					title: "How to Live on 24 Hours a Day",
					author: "Arnold Bennett",
					img: "img/covers/howtolive.jpeg",
					downloadLink: "https://www.gutenberg.org/ebooks/2274",
					readLink: "https://www.gutenberg.org/files/2274/2274-h/2274-h.htm",
					quote: "We all have 24 hours a day - how do you use yours? 30-minute read: get inspired to get shit done!"
				},
				{
					id: 22,
					title: "The Art of War",
					author: "Sun Tzu",
					img: "img/covers/artofwar.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/132",
					readLink: "http://www.gutenberg.org/cache/epub/132/pg132-images.html",
					quote: "The lessons in this book can apply to anyone's situation.  Short read, long think."
				},
				{
					id: 23,
					title: "The Prince",
					author: "Niccolò Machiavelli",
					img: "img/covers/theprince.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/1232",
					readLink: "https://www.gutenberg.org/files/1232/1232-h/1232-h.htm",
					quote: "Is it a satire, or is it just a brutally honest look at conquest? That's up for debate..."  
				},
				{
					id: 24,
					title: "Siddhartha",
					author: "Hermann Hesse",
					img: "img/covers/sidd.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/2500",
					readLink: "https://www.gutenberg.org/files/2500/2500-h/2500-h.htm",
					quote: "Siddhartha seeks enlightenment.  He learns from ascetics, socialites, peasants and the river."
				},
			]//items
		},
		{
			title: "TO READ",
			items: [
				{
					id: 25,
					title: "Flatland: A Romance of Many Dimensions",
					author: "Edwin Abbott Abbott",
					img: "img/covers/flatland.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/201",
					readLink: "https://www.gutenberg.org/files/201/201-h/201-h.htm",
					quote: ""
				},
				{
					id: 26,
					title: "Anna Karenina",
					author: "Leo Tolstoy",
					img: "img/covers/karenina.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/1399",
					readLink: "https://www.gutenberg.org/files/1399/1399-h/1399-h.htm",
					quote: ""
				},
				{
					id: 27,
					title: "White Fang",
					author: "Jack London",
					img: "img/covers/whitefang.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/910",
					readLink: "https://www.gutenberg.org/files/910/910-h/910-h.htm",
					quote: ""
				},
				{
					id: 28,
					title: "Candide",
					author: "Voltaire",
					img: "img/covers/candide.jpg",
					downloadLink: "https://www.gutenberg.org/ebooks/19942",
					readLink: "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm",
					quote: ""
				},
			]//items
		},
	]//shelves
}//board