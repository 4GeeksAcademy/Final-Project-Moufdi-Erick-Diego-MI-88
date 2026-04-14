from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Enum, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, foreign, relationship
import enum


db = SQLAlchemy()


class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    
    business_id: Mapped[int | None] = mapped_column(ForeignKey("business.id"), nullable=True)


    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
   
class BusinessType(enum.Enum):
    FOOD = "food"
    RETAIL = "retail"
    BEAUTY = "beauty"
    HEALTH = "health"
    FITNESS = "fitness"
    HOME_SERVICES = "home_services"
    AUTO_SERVICES = "auto_services"
    PROFESSIONAL_SERVICES = "professional_services"
    EDUCATION = "education"
    PET_SERVICES = "pet_services"
    EVENTS = "events"
    TECHNOLOGY = "technology"
    REAL_ESTATE = "real_estate"
    TRAVEL = "travel"
    OTHER = "other"


class Business(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    type_of_business: Mapped[str] = mapped_column(String(120), nullable=False)
    business_name: Mapped[str] = mapped_column(String(120))
    business_phone_number: Mapped[str] = mapped_column(String(120))
    business_address: Mapped[str] = mapped_column(String(120))
    business_description: Mapped[str] = mapped_column(String(255))
    business_image: Mapped[str] = mapped_column(String(255), nullable=True)
    discounts: Mapped[list["Discount"]] = relationship(backref="business", cascade="all, delete-orphan")

    def serialize(self):
        return {
            "id": self.id,
            "type_of_business": self.type_of_business,
            "business_name": self.business_name,
            "business_phone_number": self.business_phone_number,
            "business_address": self.business_address,
            "business_description": self.business_description,
            "business_image": self.business_image
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
            "percentage_rate": self.percentage_rate,
            "business_id": self.business_id
        }