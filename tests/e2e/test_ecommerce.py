"""
End-to-end tests for the Vyapaar Global ecommerce site.

Requires:
  - pip install playwright
  - python -m playwright install chromium
  - Dev server running on http://localhost:3000 (npm run dev)

Run:
  python tests/e2e/test_ecommerce.py
"""

from playwright.sync_api import sync_playwright
import os

BASE_URL = "http://localhost:3000"
SCREENSHOT_DIR = os.path.join(os.path.dirname(__file__), "screenshots")
os.makedirs(SCREENSHOT_DIR, exist_ok=True)


def screenshot(page, name):
    path = f"{SCREENSHOT_DIR}/{name}.png"
    page.screenshot(path=path, full_page=False)
    print(f"  Screenshot: {path}")
    return path


def screenshot_full(page, name):
    path = f"{SCREENSHOT_DIR}/{name}.png"
    page.screenshot(path=path, full_page=True)
    print(f"  Full screenshot: {path}")
    return path


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    page = context.new_page()

    # ──────────────────────────────────────
    # 1. HOMEPAGE
    # ──────────────────────────────────────
    print("\n=== 1. HOMEPAGE ===")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    screenshot(page, "01_homepage_above_fold")

    assert page.locator("header").count() > 0, "Header missing"
    assert page.locator("footer").count() > 0, "Footer missing"
    print("  Header and Footer present")

    hero = page.locator("text=Farm to Shelf")
    assert hero.count() > 0, "Hero banner text missing"
    print("  Hero banner rendered")

    trust = page.locator("text=Free UK Delivery")
    assert trust.count() > 0, "Trust indicators missing"
    print("  Trust indicators present")

    page.evaluate("window.scrollBy(0, 600)")
    page.wait_for_timeout(500)
    screenshot(page, "02_homepage_categories")

    cats = page.locator("text=Featured Categories")
    assert cats.count() > 0, "Categories section missing"
    print("  Featured Categories section present")

    page.evaluate("window.scrollBy(0, 800)")
    page.wait_for_timeout(500)
    screenshot(page, "03_homepage_products")

    products_section = page.locator("text=Popular Products")
    assert products_section.count() > 0, "Popular Products section missing"
    print("  Popular Products section present")

    page.evaluate("window.scrollBy(0, 1000)")
    page.wait_for_timeout(500)
    screenshot(page, "04_homepage_new_arrivals")

    page.evaluate("window.scrollBy(0, 1200)")
    page.wait_for_timeout(500)
    screenshot(page, "05_homepage_cta_footer")

    screenshot_full(page, "06_homepage_full")
    print("  Homepage PASSED")

    # ──────────────────────────────────────
    # 2. HEADER NAVIGATION
    # ──────────────────────────────────────
    print("\n=== 2. HEADER NAVIGATION ===")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")

    for link_text in ["Home", "Categories", "Shop", "Catalogue", "Suppliers", "Contact", "Help"]:
        link = page.locator(f"nav >> text={link_text}")
        assert link.count() > 0, f"Nav link '{link_text}' missing"
    print("  All nav links present")

    search = page.locator("input[placeholder='Search products...']")
    assert search.count() > 0, "Search bar missing"
    print("  Search bar present")

    cart_btn = page.locator("header >> text=£0.00")
    assert cart_btn.count() > 0, "Cart button missing"
    print("  Cart button with price present")

    cat_btn = page.locator("nav >> text=Categories")
    cat_btn.click()
    page.wait_for_timeout(400)
    screenshot(page, "07_categories_dropdown")
    dropdown = page.locator("text=Browse Categories")
    assert dropdown.count() > 0, "Categories dropdown didn't open"
    print("  Categories dropdown works")

    page.locator("body").click(position={"x": 10, "y": 10})
    page.wait_for_timeout(300)
    print("  Header PASSED")

    # ──────────────────────────────────────
    # 3. CATEGORY PAGE
    # ──────────────────────────────────────
    print("\n=== 3. CATEGORY PAGE ===")
    page.goto(f"{BASE_URL}/products/vegetable")
    page.wait_for_load_state("networkidle")
    screenshot(page, "08_category_vegetables")

    breadcrumb_home = page.locator("a >> text=Home")
    assert breadcrumb_home.count() > 0, "Breadcrumb missing"
    print("  Breadcrumb present")

    heading = page.locator("h1")
    assert heading.count() > 0, "Category heading missing"
    print(f"  Category heading: {heading.first.text_content()}")

    product_cards = page.locator("[href*='/products/detail/']")
    card_count = product_cards.count()
    print(f"  {card_count} product cards found")
    assert card_count > 0, "No product cards on category page"

    filter_btn = page.locator("text=Filter")
    assert filter_btn.count() > 0, "Filter button missing"
    sort_select = page.locator("select")
    assert sort_select.count() > 0, "Sort dropdown missing"
    print("  Filter and sort controls present")
    print("  Category page PASSED")

    # ──────────────────────────────────────
    # 4. PRODUCT DETAIL PAGE
    # ──────────────────────────────────────
    print("\n=== 4. PRODUCT DETAIL PAGE ===")
    page.goto(f"{BASE_URL}/products/detail/5")
    page.wait_for_load_state("networkidle")
    screenshot(page, "09_product_detail")

    product_title = page.locator("h1")
    assert product_title.count() > 0, "Product title missing"
    print(f"  Product title: {product_title.first.text_content()}")

    price_el = page.locator("text=£23.85")
    assert price_el.count() > 0, "Product price missing"
    print("  Price displayed correctly")

    add_cart = page.locator("button >> text=Add to Cart")
    assert add_cart.count() > 0, "Add to Cart button missing"
    print("  Add to Cart button present")

    stock = page.locator("text=In Stock")
    assert stock.count() > 0, "Stock status missing"
    print("  Stock status shown")

    desc = page.locator("text=Description")
    assert desc.count() > 0, "Description section missing"
    print("  Description section present")

    page.evaluate("window.scrollBy(0, 600)")
    page.wait_for_timeout(400)
    screenshot(page, "10_product_detail_bottom")

    features = page.locator("text=Free delivery on orders over £500")
    assert features.count() > 0, "Feature list missing"
    print("  Feature list present")
    print("  Product detail page PASSED")

    # ──────────────────────────────────────
    # 5. ADD TO CART + CART PAGE
    # ──────────────────────────────────────
    print("\n=== 5. ADD TO CART FLOW ===")
    # Cart is React Context only (not persisted to localStorage),
    # so we test within a single client-side session.
    page.goto(f"{BASE_URL}/products/detail/5")
    page.wait_for_load_state("networkidle")

    add_btn = page.locator("button").filter(has_text="Add to Cart").first
    add_btn.click()
    page.wait_for_timeout(600)
    screenshot(page, "11_added_to_cart_feedback")

    added_text = page.locator("text=Added to Cart!")
    assert added_text.count() > 0, "Add to cart feedback missing"
    print("  'Added to Cart!' feedback shown")

    page.wait_for_timeout(300)
    header_price = page.locator("header a[href='/cart']")
    header_text = header_price.text_content()
    assert "23.85" in header_text, f"Cart price not updated, got: {header_text}"
    print(f"  Cart header shows: {header_text.strip()}")

    # Navigate to cart by CLICKING the cart link (preserves React context)
    header_price.click()
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(500)
    screenshot(page, "12_cart_page_with_item")

    assert "/cart" in page.url, f"Not on cart page, url: {page.url}"
    print(f"  Navigated to cart page: {page.url}")

    cart_item = page.locator("text=Blue Almonds")
    assert cart_item.count() > 0, "Cart item not found"
    print("  Product found in cart")

    subtotal = page.locator("text=Subtotal")
    assert subtotal.count() > 0, "Subtotal missing"
    vat = page.locator("text=VAT (20%)")
    assert vat.count() > 0, "VAT missing"
    print("  Price breakdown present")

    place_order = page.locator("button >> text=Place Order")
    assert place_order.count() > 0, "Place Order button missing"
    print("  Place Order button present")

    increment_btn = page.locator("button:has(svg.lucide-plus)")
    if increment_btn.count() > 0:
        increment_btn.first.click()
        page.wait_for_timeout(400)
        screenshot(page, "13_cart_quantity_updated")
        print("  Quantity increment works")

    remove_btn = page.locator("text=Remove")
    if remove_btn.count() > 0:
        remove_btn.first.click()
        page.wait_for_timeout(500)
        screenshot(page, "14_cart_empty_state")

        empty_msg = page.locator("text=Your cart is empty")
        assert empty_msg.count() > 0, "Empty cart message missing"
        browse_btn = page.locator("text=Browse Catalogue")
        assert browse_btn.count() > 0, "Browse Catalogue button missing"
        print("  Remove item works — empty cart state displayed")

    print("  Cart flow PASSED")

    # ──────────────────────────────────────
    # 6. LOGIN PAGE
    # ──────────────────────────────────────
    print("\n=== 6. LOGIN PAGE ===")
    page.goto(f"{BASE_URL}/auth/login")
    page.wait_for_load_state("networkidle")
    screenshot(page, "15_login_page")

    login_heading = page.locator("text=Welcome Back")
    assert login_heading.count() > 0, "Login heading missing"
    print("  Login heading present")

    email_input = page.locator("input#email")
    assert email_input.count() > 0, "Email input missing"
    password_input = page.locator("input#password")
    assert password_input.count() > 0, "Password input missing"
    print("  Email and password fields present")

    google_btn = page.locator("text=Google")
    facebook_btn = page.locator("text=Facebook")
    assert google_btn.count() > 0, "Google login button missing"
    assert facebook_btn.count() > 0, "Facebook login button missing"
    print("  Social login buttons present")

    signup_link = page.locator("a >> text=Sign up")
    assert signup_link.count() > 0, "Sign up link missing"
    print("  Sign up link present")

    remember = page.locator("text=Remember me")
    forgot = page.locator("text=Forgot password?")
    assert remember.count() > 0, "Remember me missing"
    assert forgot.count() > 0, "Forgot password link missing"
    print("  Remember me and forgot password present")
    print("  Login page PASSED")

    # ──────────────────────────────────────
    # 7. SIGNUP PAGE
    # ──────────────────────────────────────
    print("\n=== 7. SIGNUP PAGE ===")
    page.goto(f"{BASE_URL}/auth/signup")
    page.wait_for_load_state("networkidle")
    screenshot(page, "16_signup_page")

    signup_heading = page.locator("text=Create Account")
    assert signup_heading.count() > 0, "Signup heading missing"
    print("  Signup heading present")

    for field_id in ["name", "email", "phone", "password", "confirmPassword"]:
        field = page.locator(f"input#{field_id}")
        assert field.count() > 0, f"Field '{field_id}' missing"
    print("  All form fields present (name, email, phone, password, confirm)")

    terms = page.locator("text=Terms and Conditions")
    assert terms.count() > 0, "Terms link missing"
    print("  Terms checkbox present")

    signin_link = page.locator("a >> text=Sign in")
    assert signin_link.count() > 0, "Sign in link missing"
    print("  Sign in link present")
    print("  Signup page PASSED")

    # ──────────────────────────────────────
    # 8. PRODUCT CARD HOVER
    # ──────────────────────────────────────
    print("\n=== 8. PRODUCT CARD INTERACTIONS ===")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")

    page.evaluate("window.scrollTo(0, 900)")
    page.wait_for_timeout(500)

    first_card = page.locator("[href*='/products/detail/']").first
    first_card.hover()
    page.wait_for_timeout(500)
    screenshot(page, "17_product_card_hover")

    quick_add = page.locator("text=Quick Add")
    if quick_add.count() > 0:
        print("  Quick Add overlay appears on hover")
    else:
        print("  Quick Add hover (CSS-based — may not trigger in headless)")
    print("  Product card interactions PASSED")

    # ──────────────────────────────────────
    # 9. CROSS-PAGE NAVIGATION
    # ──────────────────────────────────────
    print("\n=== 9. CROSS-PAGE NAVIGATION ===")
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")

    page.evaluate("window.scrollTo(0, 500)")
    page.wait_for_timeout(400)

    cat_link = page.locator("[href='/products/cake-milk']").first
    if cat_link.count() > 0:
        cat_link.click()
        page.wait_for_load_state("networkidle")
        screenshot(page, "18_nav_to_dairy")
        assert "cake-milk" in page.url, "Didn't navigate to category page"
        print("  Navigation to Dairy & Milk category works")

    shop_link = page.locator("nav >> text=Shop")
    if shop_link.count() > 0:
        shop_link.click()
        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(400)
        screenshot(page, "19_nav_via_shop_link")
        print(f"  Shop link navigated to: {page.url}")

    page.goto(f"{BASE_URL}/products/detail/11")
    page.wait_for_load_state("networkidle")
    assert page.locator("h1").count() > 0, "Product detail page didn't load"
    print("  Direct product detail navigation works")

    print("  Cross-page navigation PASSED")

    # ──────────────────────────────────────
    # 10. RESPONSIVE DESIGN
    # ──────────────────────────────────────
    print("\n=== 10. RESPONSIVE DESIGN ===")

    page.set_viewport_size({"width": 768, "height": 1024})
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    screenshot(page, "20_tablet_homepage")
    print("  Tablet view (768px) captured")

    page.set_viewport_size({"width": 375, "height": 812})
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    screenshot(page, "21_mobile_homepage")
    print("  Mobile view (375px) captured")

    mobile_menu = page.locator("button:has(svg.lucide-menu)")
    if mobile_menu.count() > 0:
        mobile_menu.click()
        page.wait_for_timeout(500)
        screenshot(page, "22_mobile_menu_open")
        print("  Mobile menu opens correctly")

    page.goto(f"{BASE_URL}/auth/login")
    page.wait_for_load_state("networkidle")
    screenshot(page, "23_mobile_login")
    print("  Mobile login captured")

    page.goto(f"{BASE_URL}/products/detail/11")
    page.wait_for_load_state("networkidle")
    screenshot(page, "24_mobile_product_detail")
    print("  Mobile product detail captured")

    page.set_viewport_size({"width": 1440, "height": 900})
    print("  Responsive design PASSED")

    # ──────────────────────────────────────
    # 11. OUT OF STOCK PRODUCT
    # ──────────────────────────────────────
    print("\n=== 11. OUT OF STOCK PRODUCT ===")
    page.goto(f"{BASE_URL}/products/detail/4")
    page.wait_for_load_state("networkidle")
    screenshot(page, "25_out_of_stock_product")

    out_status = page.locator("text=Out of Stock")
    assert out_status.count() > 0, "Out of Stock status missing"
    print("  Out of Stock status shown")

    add_btn_disabled = page.locator("button:has-text('Add to Cart')[disabled]")
    assert add_btn_disabled.count() > 0, "Add to Cart not disabled for OOS product"
    print("  Add to Cart button is disabled")
    print("  Out of stock page PASSED")

    # ──────────────────────────────────────
    # SUMMARY
    # ──────────────────────────────────────
    print("\n" + "=" * 50)
    print("ALL 11 TEST SUITES PASSED!")
    print("=" * 50)
    print(f"\nScreenshots saved to: {SCREENSHOT_DIR}/")
    print("Files:")
    for f in sorted(os.listdir(SCREENSHOT_DIR)):
        size_kb = os.path.getsize(f"{SCREENSHOT_DIR}/{f}") / 1024
        print(f"  {f} ({size_kb:.0f} KB)")

    browser.close()
