from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from model import Product
from database import session, engine
import database_models

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

database_models.Base.metadata.create_all(bind=engine)

products = [
    Product(id=1, name="Laptop", description="Powerful Laptop", price=1200, quantity=10),
    Product(id=2, name="Mouse", description="Wireless Mouse", price=20, quantity=100),
    Product(id=3, name="Keyboard", description="Mechanical Keyboard", price=80, quantity=50),
    Product(id=4, name="Monitor", description="24 inch Monitor", price=200, quantity=30),
    Product(id=5, name="Headphones", description="Noise Cancelling Headphones", price=150, quantity=25),
]

def get_db_session():
    db = session()
    try:
        yield db
    except Exception as e:
        print(f"error occurred : {e}")
    finally:
        db.close()

def init_db():
    db = session()
    try:
        count = db.query(database_models.Product).count()
        if count == 0:
            for prod in products:
                db.add(database_models.Product(**prod.model_dump()))
            db.commit()
    finally:
        db.close()

init_db()

@app.get("/products")
def get_all_products(db: Session = Depends(get_db_session)):
    db_products = db.query(database_models.Product).all()
    return db_products

@app.get("/products/{id}")
def get_product_by_id(id: int, db: Session = Depends(get_db_session)):
    product = db.query(database_models.Product).filter(database_models.Product.id == id).first()
    if product:
        return product
    return "Product not found"

@app.post("/products")
def add_product(product: Product, db: Session = Depends(get_db_session)):
    db.add(database_models.Product(**product.model_dump()))
    db.commit()
    return f"{product.name} added successfully"

@app.put("/products/{id}")
def update_product(id: int, product: Product, db: Session = Depends(get_db_session)):
    db_product = db.query(database_models.Product).filter(database_models.Product.id == id).first()
    if db_product:
        db_product.name = product.name
        db_product.description = product.description
        db_product.price = product.price
        db_product.quantity = product.quantity
        db.commit()
        return f"Product with ID {id} has been updated successfully"
    return "Product not found"

@app.delete("/products/{id}")
def delete_product(id: int, db: Session = Depends(get_db_session)):
    product = db.query(database_models.Product).filter(database_models.Product.id == id).first()
    if product:
        db.delete(product)
        db.commit()
        return f"Product with ID {id} has been deleted successfully"
    return f"Product with ID {id} is not found"
