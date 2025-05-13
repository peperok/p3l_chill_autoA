import { useState } from 'react';

const DetailBarang = () => {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([
        { id: 1, user: 'John Doe', text: 'Does this come in other colors?', date: '2023-03-15' },
        { id: 2, user: 'Jane Smith', text: 'I bought this last week and it works great!', date: '2023-03-10' },
    ]);

    const product = {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 299.99,
        description: 'Experience crystal-clear sound quality with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, gamers, and professionals who need to focus.',
        imageUrl: '/api/placeholder/500/300',
        stock: 15
    };

    const handleAddToCart = () => {
        alert(`Added to cart!`);
    };

    const handleSubmitComment = (e) => {
        e.preventDefault();
        if (comment.trim() === '') return;
        
        const newComment = {
        id: comments.length + 1,
        user: 'Current User',
        text: comment,
        date: new Date().toISOString().split('T')[0]
        };
        
        setComments([newComment, ...comments]);
        setComment('');
    };

    return (
        <div style={styles.container}>
            <div style={styles.productSection}>
                {/* Left side - Product Image */}
                <div style={styles.imageContainer}>
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    style={styles.productImage}
                />
                </div>
                
                {/* Right side - Product Details */}
                <div style={styles.detailsContainer}>
                <h1 style={styles.productName}>{product.name}</h1>
                <div style={styles.priceBadge}>${product.price.toFixed(2)}</div>
                
                <div style={styles.availability}>
                    {product.stock > 0 ? (
                    <span style={styles.inStock}>In Stock ({product.stock} available)</span>
                    ) : (
                    <span style={styles.outOfStock}>Out of Stock</span>
                    )}
                </div>
                
                <p style={styles.description}>{product.description}</p>
                
                <div style={styles.addToCartSection}>
                    <div style={styles.quantitySelector}>
                    <button 
                        style={styles.quantityButton}
                        onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    >
                        -
                    </button>
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        style={styles.quantityInput}
                        min="1"
                    />
                    <button 
                        style={styles.quantityButton}
                        onClick={() => quantity < product.stock && setQuantity(quantity + 1)}
                    >
                        +
                    </button>
                    </div>
                    
                    <button 
                    style={styles.addToCartButton}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    >
                    Add to Cart
                    </button>
                </div>
                </div>
            </div>
            
            {/* Discussion Forum Section */}
            <div style={styles.discussionSection}>
                <h2 style={styles.sectionTitle}>Discussion Forum</h2>
                
                {/* Comment Input */}
                <div style={styles.commentForm}>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Ask a question or leave a comment about this product..."
                    style={styles.commentInput}
                    rows="3"
                />
                <button 
                    onClick={handleSubmitComment}
                    style={styles.postButton}
                >
                    Post Comment
                </button>
                </div>
                
                {/* Comments List */}
                <div style={styles.commentsList}>
                {comments.map((comment) => (
                    <div key={comment.id} style={styles.commentCard}>
                    <div style={styles.commentHeader}>
                        <strong>{comment.user}</strong>
                        <span style={styles.commentDate}>{comment.date}</span>
                    </div>
                    <p style={styles.commentText}>{comment.text}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  productSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: '30px',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  imageContainer: {
    flex: '1 1 400px',
    minWidth: '300px',
  },
  productImage: {
    width: '100%',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  detailsContainer: {
    flex: '1 1 400px',
    minWidth: '300px',
  },
  productName: {
    fontSize: '28px',
    marginTop: '0',
    marginBottom: '10px',
    color: '#333',
  },
  priceBadge: {
    display: 'inline-block',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#4CAF50',
    padding: '8px 16px',
    borderRadius: '4px',
    marginBottom: '15px',
  },
  availability: {
    marginBottom: '15px',
  },
  inStock: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  outOfStock: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  description: {
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '25px',
  },
  addToCartSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px',
  },
  quantitySelector: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  quantityButton: {
    backgroundColor: '#f5f5f5',
    border: 'none',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '18px',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
  },
  quantityInput: {
    width: '50px',
    height: '36px',
    textAlign: 'center',
    border: 'none',
    borderLeft: '1px solid #ddd',
    borderRight: '1px solid #ddd',
    fontSize: '16px',
  },
  addToCartButton: {
    backgroundColor: '#ff5722',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  discussionSection: {
    borderTop: '1px solid #eee',
    paddingTop: '30px',
  },
  sectionTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  commentForm: {
    marginBottom: '30px',
  },
  commentInput: {
    width: '100%',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    fontSize: '16px',
    resize: 'vertical',
  },
  postButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  commentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  commentCard: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
  },
  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  commentDate: {
    color: '#888',
    fontSize: '14px',
  },
  commentText: {
    margin: '0',
    lineHeight: '1.5',
  },
};

export default DetailBarang;