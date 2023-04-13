using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();

            return MapBasketToDto(basket);
        }


        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId , int quantity)
        {
            var basket = await RetrieveBasket();

            // create Basket
            if(basket == null) basket = CreateBasket();
            
            // get product
            var product = await _context.Products.FindAsync(productId);
            
            if(product == null) return NotFound();

            // Add item
            basket.AddItem(product, quantity);
            
            // save changes
            var result = await _context.SaveChangesAsync() > 0;

            if(result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails{Title = "problem saving item to basket"});
        }


        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            // get Basket
            var basket = await RetrieveBasket();

            if(basket == null) return NotFound(); 
            // remove item or reduce quantity
            basket.RemoveItem(productId, quantity);
            // save changes
            var result = await _context.SaveChangesAsync() > 0;

            if(result) return Ok();

            return BadRequest(new ProblemDetails{Title = "Problem Removing item from basket"});
        }

        
        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BayerId == Request.Cookies["buyerId"]);
        }


        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var CookieOptions = new CookieOptions{IsEssential = true , Expires = DateTime.Now.AddDays(30)};
            Response.Cookies.Append("buyerId", buyerId, CookieOptions);
            var basket = new Basket{BayerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }


        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto
            {
                id = basket.Id,
                BayerId = basket.BayerId,
                Items = basket.Items.Select(item => new BasketItemDto
                {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                price = item.Product.price,
                PictureUrl = item.Product.PictureUrl,
                Type = item.Product.Type,
                Brand = item.Product.Brand,
                Quantity = item.Quantity

                }).ToList()
            };
        }
    }
}