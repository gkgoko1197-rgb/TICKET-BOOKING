
export type TaxiDriver = {
    id: string;
    name: string;
    age: number;
    car: {
      make: string;
      model: string;
      plate: string;
    };
    phone: string;
    rating: number;
    company: string;
  };
  
  export const taxiDrivers: TaxiDriver[] = [
    { id: '1', name: 'John Smith', age: 45, car: { make: 'Toyota', model: 'Camry', plate: 'NYC-1234' }, phone: '555-123-4567', rating: 4.8, company: 'Metro Cabs' },
    { id: '2', name: 'Maria Garcia', age: 32, car: { make: 'Honda', model: 'Accord', plate: 'LA-5678' }, phone: '555-987-6543', rating: 4.9, company: 'City Link Taxis' },
    { id: '3', name: 'David Lee', age: 58, car: { make: 'Ford', model: 'Fusion', plate: 'CHI-9101' }, phone: '555-234-5678', rating: 4.6, company: 'UrbanGo' },
    { id: '4', name: 'James Brown', age: 28, car: { make: 'Chevrolet', model: 'Malibu', plate: 'MIA-1121' }, phone: '555-876-5432', rating: 4.7, company: 'Swift Ride' },
    { id: '5', name: 'Linda Johnson', age: 62, car: { make: 'Nissan', model: 'Altima', plate: 'SF-3141' }, phone: '555-345-6789', rating: 4.8, company: 'Metro Cabs' },
    { id: '6', name: 'Robert Williams', age: 39, car: { make: 'Hyundai', model: 'Sonata', plate: 'BOS-5161' }, phone: '555-765-4321', rating: 4.5, company: 'City Link Taxis' },
    { id: '7', name: 'Patricia Jones', age: 51, car: { make: 'Kia', model: 'Optima', plate: 'DC-7181' }, phone: '555-456-7890', rating: 4.9, company: 'UrbanGo' },
    { id: '8', name: 'Michael Miller', age: 25, car: { make: 'Toyota', model: 'Prius', plate: 'SEA-9202' }, phone: '555-654-3210', rating: 4.7, company: 'Swift Ride' },
    { id: '9', name: 'Jennifer Davis', age: 41, car: { make: 'Honda', model: 'Civic', plate: 'DAL-1223' }, phone: '555-567-8901', rating: 4.6, company: 'Metro Cabs' },
    { id: '10', name: 'William Garcia', age: 68, car: { make: 'Ford', model: 'Taurus', plate: 'ATL-3243' }, phone: '555-543-2109', rating: 4.8, company: 'City Link Taxis' },
    { id: '11', name: 'Elizabeth Rodriguez', age: 35, car: { make: 'Chevrolet', model: 'Impala', plate: 'HOU-5263' }, phone: '555-432-1098', rating: 4.9, company: 'UrbanGo' },
    { id: '12', name: 'Joseph Martinez', age: 29, car: { make: 'Nissan', model: 'Maxima', plate: 'PHX-7283' }, phone: '555-321-0987', rating: 4.5, company: 'Swift Ride' },
    { id: '13', name: 'Susan Hernandez', age: 55, car: { make: 'Hyundai', model: 'Elantra', plate: 'DEN-9303' }, phone: '555-210-9876', rating: 4.7, company: 'Metro Cabs' },
    { id: '14', name: 'Thomas Wilson', age: 48, car: { make: 'Kia', model: 'Forte', plate: 'DET-1324' }, phone: '555-109-8765', rating: 4.6, company: 'City Link Taxis' },
    { id: '15', name: 'Jessica Anderson', age: 22, car: { make: 'Toyota', model: 'Corolla', plate: 'MIN-3344' }, phone: '555-098-7654', rating: 4.8, company: 'UrbanGo' },
    { id: '16', name: 'Charles Taylor', age: 61, car: { make: 'Honda', model: 'Insight', plate: 'STL-5364' }, phone: '555-987-6543', rating: 4.9, company: 'Swift Ride' },
    { id: '17', name: 'Karen Thomas', age: 38, car: { make: 'Ford', model: 'Focus', plate: 'BAL-7384' }, phone: '555-876-5432', rating: 4.7, company: 'Metro Cabs' },
    { id: '18', name: 'Daniel White', age: 43, car: { make: 'Chevrolet', model: 'Cruze', plate: 'CHA-9404' }, phone: '555-765-4321', rating: 4.5, company: 'City Link Taxis' },
    { id: '19', name: 'Nancy Harris', age: 52, car: { make: 'Nissan', model: 'Sentra', plate: 'IND-1425' }, phone: '555-654-3210', rating: 4.8, company: 'UrbanGo' },
    { id: '20', name: 'Paul Martin', age: 30, car: { make: 'Hyundai', model: 'Accent', plate: 'KC-3445' }, phone: '555-543-2109', rating: 4.9, company: 'Swift Ride' },
    { id: '21', name: 'Mark Thompson', age: 70, car: { make: 'Kia', model: 'Rio', plate: 'NSH-5465' }, phone: '555-432-1098', rating: 4.7, company: 'Metro Cabs' },
    { id: '22', name: 'Betty Clark', age: 27, car: { make: 'Toyota', model: 'Yaris', plate: 'LV-7485' }, phone: '555-321-0987', rating: 4.6, company: 'City Link Taxis' },
    { id: '23', name: 'Steven Lewis', age: 49, car: { make: 'Honda', model: 'Fit', plate: 'ORL-9505' }, phone: '555-210-9876', rating: 4.8, company: 'UrbanGo' },
    { id: '24', name: 'Sarah Walker', age: 33, car: { make: 'Ford', model: 'Fiesta', plate: 'POR-1526' }, phone: '555-109-8765', rating: 4.9, company: 'Swift Ride' },
    { id: '25', name: 'Kevin Hall', age: 59, car: { make: 'Chevrolet', model: 'Spark', plate: 'SLC-3546' }, phone: '555-098-7654', rating: 4.7, company: 'Metro Cabs' },
  ];
  
    
