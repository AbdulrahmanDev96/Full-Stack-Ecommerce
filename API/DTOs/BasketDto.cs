using System.Collections.Generic;

namespace API.DTOs
{
    public class BasketDto
    {
        public int id { get; set; }
        public string BayerId { get; set; }
        public List<BasketItemDto> Items { get; set; }
    }
}