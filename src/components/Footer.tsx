import Link from "next/link";
import { Car, Mail, MapPin, Phone, Globe, MessageCircle, Share2, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-display font-bold tracking-tight">
              <Car className="size-5 text-[var(--accent)]" />
              AutoBazaar
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
              The premium marketplace for buying and selling new and used cars. 
              Connect with trusted sellers and find your perfect ride.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/listings" className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">For Sellers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/items/add" className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
                  List Your Car
                </Link>
              </li>
              <li>
                <Link href="/items/manage" className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
                  Manage Listings
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-[var(--muted)]">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--accent)]" />
                <span>123 AutoBazaar St, Automotive City, AC 10001</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Phone className="size-4 shrink-0 text-[var(--accent)]" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Mail className="size-4 shrink-0 text-[var(--accent)]" />
                <span>hello@autobazaar.com</span>
              </li>
            </ul>

            <div className="mt-4 flex items-center gap-3">
              <a href="#" className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]" aria-label="Facebook">
                <Globe className="size-5" />
              </a>
              <a href="#" className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]" aria-label="Twitter">
                <MessageCircle className="size-5" />
              </a>
              <a href="#" className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]" aria-label="Instagram">
                <Share2 className="size-5" />
              </a>
              <a href="#" className="text-[var(--muted)] transition-colors hover:text-[var(--foreground)]" aria-label="Youtube">
                <ExternalLink className="size-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-6 text-center text-xs text-[var(--muted)]">
          &copy; {new Date().getFullYear()} AutoBazaar. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
