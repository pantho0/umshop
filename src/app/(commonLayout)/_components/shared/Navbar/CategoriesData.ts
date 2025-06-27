// interfaces for the data structure
interface SubItemSection {
  title: string;
  items: string[];
}

interface PromoData {
  title: string;
  product: string;
  image: string;
  buttonText: string;
}

export interface CategoryData {
  id: string;
  name: string;
  icon: string;
  subItems: SubItemSection[];
  promo: PromoData;
}

export const categoriesData: CategoryData[] = [
  {
    id: "computers",
    name: "Computers & Accessories",
    icon: "Laptop",
    subItems: [
      {
        title: "Laptops",
        items: [
          "Gaming Laptops",
          "Ultrabooks",
          "Business Laptops",
          "Chromebooks",
        ],
      },
      {
        title: "Desktops",
        items: [
          "Gaming Desktops",
          "All-in-One PCs",
          "Workstations",
          "Mini PCs",
        ],
      },
      {
        title: "Monitors",
        items: ["Gaming Monitors", "Curved Monitors", "Ultrawide Monitors"],
      },
      {
        title: "Components",
        items: ["CPUs", "GPUs", "Motherboards", "RAM", "Storage"],
      },
    ],
    promo: {
      title: "Deal of the week",
      product: "iMac Pro M1",
      image: "https://placehold.co/200x150/E0E0E0/333333?text=iMac+Pro+M1",
      buttonText: "Shop now",
    },
  },
  {
    id: "smartphones",
    name: "Smartphones & Tablets",
    icon: "Smartphone",
    subItems: [
      {
        title: "Smartphones",
        items: [
          "Apple iPhone",
          "Samsung",
          "Xiaomi",
          "Nokia",
          "Meizu",
          "Google Pixel",
        ],
      },
      {
        title: "Tablets",
        items: [
          "Apple iPad",
          "Android Tablets",
          "Tablets with Keyboard",
          "Kids Tablets",
        ],
      },
      {
        title: "Accessories",
        items: [
          "Accessory Kits",
          "Batteries & Battery Packs",
          "Cables",
          "Car Accessories",
          "Charges & Power Adapters",
          "FM Transmitters",
          "Repair Kits",
          "Lens Attachments",
          "Mounts & Stands",
          "Replacement Parts",
          "Styluses",
        ],
      },
    ],
    promo: {
      title: "New Arrivals",
      product: "Samsung Galaxy Tab S9",
      image: "https://placehold.co/200x150/C0C0C0/333333?text=Galaxy+Tab+S9",
      buttonText: "Discover",
    },
  },
  {
    id: "tv-audio",
    name: "TV, Video & Audio",
    icon: "Tv",
    subItems: [
      {
        title: "Televisions",
        items: ["Smart TVs", "4K UHD TVs", "OLED TVs", "QLED TVs"],
      },
      {
        title: "Home Audio",
        items: ["Soundbars", "Home Theater Systems", "Receivers", "Speakers"],
      },
    ],
    promo: {
      title: "Limited Offer",
      product: 'Sony Bravia 65" OLED',
      image: "https://placehold.co/200x150/A0A0A0/333333?text=Sony+Bravia",
      buttonText: "View Deal",
    },
  },
  {
    id: "speakers",
    name: "Speakers & Home Music",
    icon: "Speaker",
    subItems: [
      {
        title: "Portable Speakers",
        items: ["Bluetooth Speakers", "Waterproof Speakers"],
      },
      {
        title: "Smart Speakers",
        items: ["Google Home", "Amazon Echo"],
      },
    ],
    promo: {
      title: "Top Rated",
      product: "Bose SoundLink Revolve+",
      image: "https://placehold.co/200x150/909090/333333?text=Bose+Speaker",
      buttonText: "Learn More",
    },
  },
  {
    id: "cameras",
    name: "Cameras, Photo & Video",
    icon: "Camera",
    subItems: [
      {
        title: "Digital Cameras",
        items: ["DSLR Cameras", "Mirrorless Cameras", "Point & Shoot"],
      },
      {
        title: "Video Cameras",
        items: ["Camcorders", "Action Cameras", "Drones"],
      },
    ],
    promo: {
      title: "Capture Moments",
      product: "GoPro HERO12 Black",
      image: "https://placehold.co/200x150/808080/333333?text=GoPro",
      buttonText: "Shop Now",
    },
  },
  {
    id: "printers",
    name: "Printers & Ink",
    icon: "Printer",
    subItems: [
      {
        title: "Printers",
        items: ["Inkjet Printers", "Laser Printers", "All-in-One Printers"],
      },
      {
        title: "Ink & Toner",
        items: ["Ink Cartridges", "Toner Cartridges"],
      },
    ],
    promo: {
      title: "Print Perfect",
      product: "HP Envy 6055e",
      image: "https://placehold.co/200x150/707070/333333?text=HP+Printer",
      buttonText: "Buy Now",
    },
  },
  {
    id: "charging-stations",
    name: "Charging Stations",
    icon: "BatteryCharging",
    subItems: [
      {
        title: "Wireless Chargers",
        items: ["Qi Chargers", "MagSafe Chargers"],
      },
      {
        title: "Multi-Device Chargers",
        items: ["USB-C Hubs", "Charging Docks"],
      },
    ],
    promo: {
      title: "Power Up",
      product: "Anker PowerWave",
      image: "https://placehold.co/200x150/606060/333333?text=Anker+Charger",
      buttonText: "Explore",
    },
  },
  {
    id: "headphones",
    name: "Headphones",
    icon: "Headphones",
    subItems: [
      {
        title: "Over-Ear Headphones",
        items: ["Noise-Cancelling", "Wireless"],
      },
      {
        title: "In-Ear Headphones",
        items: ["True Wireless", "Sports Earbuds"],
      },
    ],
    promo: {
      title: "Immersive Sound",
      product: "Sony WH-1000XM5",
      image: "https://placehold.co/200x150/505050/333333?text=Sony+Headphones",
      buttonText: "Discover",
    },
  },
  {
    id: "wearable-electronics",
    name: "Wearable Electronics",
    icon: "Watch",
    subItems: [
      {
        title: "Smartwatches",
        items: ["Apple Watch", "Samsung Galaxy Watch", "Fitness Trackers"],
      },
      {
        title: "Smart Glasses",
        items: ["AR Glasses"],
      },
    ],
    promo: {
      title: "Stay Connected",
      product: "Apple Watch Series 9",
      image: "https://placehold.co/200x150/404040/333333?text=Apple+Watch",
      buttonText: "Shop Now",
    },
  },
  {
    id: "powerbanks",
    name: "Powerbanks",
    icon: "Power",
    subItems: [
      {
        title: "High Capacity",
        items: ["20000mAh+", "10000mAh"],
      },
      {
        title: "Compact",
        items: ["5000mAh", "Mini Powerbanks"],
      },
    ],
    promo: {
      title: "Never Run Out",
      product: "Anker PowerCore III",
      image: "https://placehold.co/200x150/303030/333333?text=Anker+Powerbank",
      buttonText: "View All",
    },
  },
  {
    id: "hdd-ssd",
    name: "HDD/SSD Data Storage",
    icon: "HardDrive",
    subItems: [
      {
        title: "External Storage",
        items: ["Portable SSDs", "External HDDs"],
      },
      {
        title: "Internal Storage",
        items: ["NVMe SSDs", "SATA SSDs", "HDDs"],
      },
    ],
    promo: {
      title: "Store More",
      product: "Samsung T7 Portable SSD",
      image: "https://placehold.co/200x150/202020/333333?text=Samsung+SSD",
      buttonText: "Find Storage",
    },
  },
  {
    id: "video-games",
    name: "Video Games",
    icon: "Gamepad",
    subItems: [
      {
        title: "Consoles",
        items: ["PlayStation 5", "Xbox Series X|S", "Nintendo Switch"],
      },
      {
        title: "PC Games",
        items: ["Action", "Adventure", "RPG", "Strategy"],
      },
    ],
    promo: {
      title: "Game On!",
      product: "PS5 Slim Console",
      image: "https://placehold.co/200x150/101010/333333?text=PS5",
      buttonText: "Explore Games",
    },
  },
];
