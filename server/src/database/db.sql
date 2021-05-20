create table Customers(
	Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    Name varchar(100) NOT NULL,
    Description text,
    Nit varchar(50) UNIQUE,
    Nrc varchar(50),
    IsDeleted bool,
    State varchar(100),
    Activity varchar(150)
);

create table CustomersAddress(
	Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    CustomerId int,
    Address varchar(150),
    IsDeleted bool,
    CONSTRAINT fk_customer_customersaddress
        FOREIGN KEY (CustomerId)
            REFERENCES Customers(Id)
            ON UPDATE CASCADE
            
);

create table CustomersPhoneNumbers(
	Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    CustomerId int,
    PhoneNumber varchar(50),
    IsDeleted bool,
    CONSTRAINT fk_customer_customersphonenumbers
        FOREIGN KEY (CustomerId)
            REFERENCES Customers(Id)
            ON UPDATE CASCADE
);

create table Sales(
	Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    correlative int NOT NULL,
    CustomerId int NOT NULL,
    CustomerName varchar(100),
    Date TIMESTAMP,
    Total DECIMAL(8,2) NOT NULL,
    CashTender DECIMAL(8,2),
    IsDeleted bool,
    CONSTRAINT fk_customer_sales
        FOREIGN KEY (CustomerId)
            REFERENCES Customers(Id)
            ON UPDATE CASCADE
);


create table Trademarks(
	Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    Name varchar(150) NOT NULL,
    Description text,
    IsDeleted bool
);

create table Capacity(
	Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    Name varchar(150) NOT NULL,
    Description text,
    IsDeleted bool
);

create table Products(
	Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    Name varchar(100),
    TrademarkId int NOT NULL,
    CapacityId int NOT NULL,
    NormalPrice DECIMAL(8,2) NOT NULL,
    SubsidyPrice DECIMAL(8,2),
    IsDeleted bool,
    CONSTRAINT fk_trademark
        FOREIGN KEY (TrademarkId)
            REFERENCES Trademarks(Id)
            ON UPDATE CASCADE,
    CONSTRAINT fk_capacity
        FOREIGN KEY (CapacityId)
            REFERENCES Capacity(Id)
            ON UPDATE CASCADE
);

create table SalesDetails(
	Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    SaleId int NOT NULL,
    ProductId int NOT NULL,
    ProductName varchar(100) NOT NULL,
    Quantity int NOT NULL,
    UnitCost DECIMAL(8,2) NOT NULL,
    Discount DECIMAL(8,2) NOT NULL,
    IsDeleted bool,
    CONSTRAINT fk_sales_salesdetails
        FOREIGN KEY (SaleId)
            REFERENCES Sales(Id)
            ON UPDATE CASCADE,
    CONSTRAINT fk_products_salesdetails
        FOREIGN KEY (ProductId)
            REFERENCES Products(Id)
            ON UPDATE CASCADE
);

create table Inventories(
	Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    Quantity int,
    ProductId int NOT NULL,
    Total int NOT NULL,
    Cost DECIMAL(8,2),
    IsDeleted bool,
    CONSTRAINT fk_products_inventories
        FOREIGN KEY (ProductId)
            REFERENCES Products(Id)
            ON UPDATE CASCADE
);

create table InventoriesModifications(
	Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    InventoryId int,
    QuantityBefore int NOT NULL,
    QuantityAfter int NOT NULL,
    Reason text NOT NULL,
    ModifyBy varchar(100) NOT NULL,
    IsDeleted bool,
    CONSTRAINT fk_inventories
        FOREIGN KEY (InventoryId)
            REFERENCES Inventories(Id)
            ON UPDATE CASCADE
);

create table Providers(
    Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    Name varchar(150),
    ContactName varchar(150),
    PhoneNumber varchar(50),
    Email varchar(100),
    IsDeleted bool
);

create table Purchases(
    Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    Date TIMESTAMP NOT NULL,
    ProviderId INT NOT NULL,
    Document varchar(150) NOT NULL,
    Amount DECIMAL(8,2),
    ReceiptPhoto varchar,
    IsDeleted bool,
    CONSTRAINT fk_providers
        FOREIGN KEY (ProviderId)
            REFERENCES Providers(Id)
            ON UPDATE CASCADE
);

create table PurchasesDetails(
    Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    PurchasesId INT NOT NULL,
    Quantity INT NOT NULL,
    ProductId INT NOT NULL,
    ProductName varchar(150) NOT NULL,
    Cost DECIMAL(8,2),
    IsDeleted bool,
    CONSTRAINT fk_pruchases
        FOREIGN KEY (PurchasesId)
            REFERENCES Purchases(Id)
            ON UPDATE CASCADE,
    CONSTRAINT fk_products_PurchasesDetails
        FOREIGN KEY (ProductId)
            REFERENCES Products(Id)
            ON UPDATE CASCADE
);

create table Transactions(
    Id SERIAL PRIMARY KEY UNIQUE NOT NULL,
    reference int,
    amount DECIMAL NOT NULL,
    type bool NOT NULL,
    Description text,
    timestamp TIMESTAMP,
    IsDeleted bool
);

create table Licence(
    LicenceId varchar(200) UNIQUE NOT NULL,
    TypeSuscription varchar(100) NOT NULL,
    Expires Date,
    LastCheck Date,
    Owner varchar(100),
    LastPayment Date
);

create table Configurations(
    BusinessName varchar(100) NOT NULL,
    Description text,
    BusinessTopic varchar(100),
    Nit varchar(50),
    Nrc varchar(50),
    NumberPhone varchar(50),
    PrinterIp varchar(50),
    PrinterPort int,
    PrinterName varchar,
    Pin varchar NOT NULL,
    CheckShipmentsAutomatically bool NOT NULL,
    LockScreenTime int NOT NULL,
    timeZone varchar NOT NULL,
    languaje varchar NOT NULL
);










