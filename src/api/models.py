from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Enum
from sqlalchemy.orm import Mapped, mapped_column, foreign, relationship
import enum


db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class BusinessType(enum.Enum):
    Agriculture  = "agriculture, forestry, fishing & hunting"
    Construction  = "Construction, Skilled_trades"
    Manufacturing = "manufacturing"
    Wholesale  = "wholesale & retail trade"
    Transportation = "transportation, warehousing"


class Business(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    type_of_business: Mapped[BusinessType] = mapped_column(Enum(BusinessType), nullable=False) 
    business_name: Mapped[str] = mapped_column(String(120))
    business_phone_number: Mapped[str] = mapped_column(String(120))
    business_address: Mapped[str] = mapped_column(String(120))
    discounts: Mapped[list["Discount"]] = relationship(backref="business", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "type_of_business": self.type_of_business.value,
            "business_name": self.business_name,
            "business_phone_number": self.business_phone_number,
            "business_address": self.business_address
        }

class Discount(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    discount_title: Mapped[str] = mapped_column(String(120))
    description: Mapped[str] = mapped_column(String(120))
    percentage_rate: Mapped[float] = mapped_column(nullable=False)
    business_id: Mapped[int] = mapped_column(db.ForeignKey("business.id"))

    def serialize(self):
        return {
            "id": self.id,
            "discount_title": self.discount_title,
            "description": self.description,
            "business_id": self.business_id
        }