// --- Quản lý Sản phẩm ---
interface Product {
    id: number
    name: string
    price: number
    category: string
}

const products: Product[] = [
    { id: 1, name: "Laptop", price: 20000, category: "Điện tử" },
    { id: 2, name: "Smartphone", price: 15000, category: "Điện tử" },
    { id: 3, name: "Bánh mì", price: 20, category: "Thực phẩm" },
    { id: 4, name: "Nước ngọt", price: 15, category: "Thực phẩm" },
    { id: 5, name: "Tủ lạnh", price: 5000, category: "Điện tử" }
]

// lọc theo danh mục
function filterByCategory(list: Product[], category: string): Product[] {
    return list.filter(p => p.category === category)
}

// tính tổng giá
function calculateTotalPrice(list: Product[]): number {
    return list.reduce((total, p) => total + p.price, 0)
}

// tìm min max
function findMinMax(productList: Product[]): { min: Product; max: Product } {
    let min = productList[0];
    let max = productList[0];

    for (let p of productList) {
        if (p.price < min.price) min = p;
        if (p.price > max.price) max = p;
    }

    return { min, max };
}

// Demo
console.log("Sản phẩm thuộc danh mục Điện tử:", filterByCategory(products, "Điện tử"));
console.log("Tổng giá trị sản phẩm:", calculateTotalPrice(products));
console.log("Rẻ nhất và đắt nhất:", findMinMax(products));


// Demo sản phẩm
console.log("Điện tử:", filterByCategory(products, "Điện tử"))
console.log("Tổng giá:", calculateTotalPrice(products))
const mm = findMinMax(products)
console.log("Rẻ nhất:", mm.min.name, "-", mm.min.price)
console.log("Đắt nhất:", mm.max.name, "-", mm.max.price)


// --- Quản lý Phương tiện ---
interface Vehicle {
    name: string
    type: string
    speed: number
}

enum FuelType {
    Xang = "Xăng",
    Dien = "Điện"
}

interface MotorizedVehicle extends Vehicle {
    fuelType: FuelType
}

// tính thời gian đi
function calculateTravelTime(vehicle: Vehicle, distance: number): number {
    return distance / vehicle.speed
}

const vehicles: MotorizedVehicle[] = [
    { name: "Xe máy", type: "Xe máy", speed: 60, fuelType: FuelType.Xang },
    { name: "Ô tô", type: "Ô tô", speed: 80, fuelType: FuelType.Xang },
    { name: "Xe điện", type: "Xe máy", speed: 50, fuelType: FuelType.Dien }
]

// Demo phương tiện
for (let v of vehicles) {
    console.log(`${v.name} đi 100km mất: ${calculateTravelTime(v, 100)} giờ`)
}
