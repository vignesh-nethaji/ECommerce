using ECommerce.Models;
using ECommerce.Models.ViewModels;
using ECommerce.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerce.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase, IDisposable
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        public void Dispose()
        {
            _productService.Dispose();
        }

        /// <summary>
        /// Get All product details
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            ResponseData<List<Product>> response = new ResponseData<List<Product>>();
            try
            {
                response.Message = "Read product Data";
                response.Data = await _productService.GetAll();
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Data = null;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }

        }

        /// <summary>
        /// Get product  by id
        /// </summary>
        /// <returns></returns>
        [HttpGet("Get/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            ResponseData<Product> response = new ResponseData<Product>();
            try
            {
                response.Message = "product data read by id";
                response.Data = await _productService.Get(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Data = null;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }

        }

        /// <summary>
        /// Add product detail
        /// </summary>
        /// <returns></returns>
        [HttpPost("Add")]
        public async Task<IActionResult> Add([FromBody] Product obj)
        {
            ResponseData<Product> response = new ResponseData<Product>();
            try
            {
                response.Data = await _productService.Insert(obj);
                response.Message = "product data Added";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Data = null;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        /// <summary>
        /// Update Product detail
        /// </summary>
        /// <returns></returns>
        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] Product obj)
        {
            ResponseData<Product> response = new ResponseData<Product>();
            try
            {
                response.Data = await _productService.Update(obj);
                response.Message = "product detail updated";
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Data = null;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        /// <summary>
        /// Delete product by id
        /// </summary>
        /// <returns></returns>
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            ResponseData<int> response = new ResponseData<int>();
            try
            {
                response.Data = id;
                response.Message = "product Deleted";
                await _productService.Delete(id);
                return Ok(response);
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }

        }
    }
    
}
