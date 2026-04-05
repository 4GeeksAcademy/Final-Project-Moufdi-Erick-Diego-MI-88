from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Enum
from sqlalchemy.orm import Mapped, mapped_column


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
    Agriculture, Forestry, Fishing, Hunting = "agriculture, forestry, fishing & hunting"
    Construction, Skilled_Trades = "Construction, Skilled_trades"
    Manufacturing = "manufacturing"
    Wholesale, Retail_Trade = "wholesale & retail trade"
    Transportation, Warehousing = "transportation, warehousing"


class Business(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    type_of_business: Mapped[BusinessType] = mapped_column(Enum(BusinessType), nullable=False) 
    business_name: Mapped[str] = mapped_column(String(120))
    business_phone_number: Mapped[str] = mapped_column(String(120))
    business_address: Mapped[str] = mapped_column(String(120))
    # business_discounts: Mapped["discounts"] = relationship(back_populates="discounts")