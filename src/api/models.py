from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
import enum



db = SQLAlchemy()
class ContactMessage(db.Model):
    __tablename__ = "contact_messages"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    message = db.Column(db.Text, nullable=False)

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    first_name: Mapped[str] = mapped_column(String(120), nullable=False)
    last_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    phone: Mapped[str] = mapped_column(String(120), nullable=True)
    city: Mapped[str] = mapped_column(String(120), nullable=True)
    date_of_birth: Mapped[str] = mapped_column(String(120), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    security_question: Mapped[str | None] = mapped_column(String(255), nullable=True)
    security_answer: Mapped[str | None] = mapped_column(String(255), nullable=True)

    business_id: Mapped[int | None] = mapped_column(ForeignKey("business.id"), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "phone": self.phone,
            "city": self.city,
            "date_of_birth": self.date_of_birth,
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
    business_name: Mapped[str] = mapped_column(String(120), nullable=False)
    business_phone_number: Mapped[str] = mapped_column(String(20), nullable=False)
    business_address: Mapped[str] = mapped_column(String(200), nullable=False)
    website: Mapped[str] = mapped_column(String(200), nullable=True)
    services: Mapped[str] = mapped_column(String(300), nullable=True)
    business_description: Mapped[str] = mapped_column(String(500), nullable=False)
    business_image: Mapped[str] = mapped_column(String(500), nullable=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)
    security_question: Mapped[str | None] = mapped_column(String(255), nullable=True)
    security_answer: Mapped[str | None] = mapped_column(String(255), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "type_of_business": self.type_of_business,
            "business_name": self.business_name,
            "business_phone_number": self.business_phone_number,
            "business_address": self.business_address,
            "website": self.website,
            "services": self.services,
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